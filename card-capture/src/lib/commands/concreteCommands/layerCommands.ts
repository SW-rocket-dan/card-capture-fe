import { BasePosition, Command } from '@/lib/commands/type';
import { useCardsStore } from '@/store/useCardsStore';
import { LayerFactory } from '@/lib/commands/factories/layerFactory';
import { Image, LayerContentMap, LayerType, Position } from '@/store/useCardsStore/type';
import ReactQuill from 'react-quill';
import { useCommandStore } from '@/store/useCommandStore';

export const createAddLayerCommand = <T extends LayerType>(
  cardId: number,
  type: T,
  content?: Partial<LayerContentMap[T]>,
  position?: Partial<BasePosition>,
): Command => {
  const cardStore = useCardsStore.getState();
  const { layerId, zIndex } = cardStore.getNewLayerInfo(cardId);

  const newLayer = LayerFactory.createLayer<T>({
    type,
    id: layerId,
    zIndex,
    content,
    position,
  });

  return {
    type: 'ADD_LAYER',
    execute: () => {
      cardStore.addLayer(cardId, newLayer);
    },
    undo: () => {
      cardStore.deleteLayer(cardId, layerId);
    },
  };
};

export const createDeleteLayerCommand = (cardId: number, layerId: number): Command => {
  const cardStore = useCardsStore.getState();
  const layerToDelete = cardStore.getLayer(cardId, layerId);

  if (!layerToDelete) throw new Error(`Layer not found: ${layerId}`);

  return {
    type: 'DELETE_LAYER',
    execute: () => {
      cardStore.deleteLayer(cardId, layerId);
    },
    undo: () => {
      cardStore.addLayer(cardId, layerToDelete);
    },
  };
};

export const createModifyTextLayerCommand = (
  cardId: number,
  layerId: number,
  text: ReactQuill.Value,
  initialText: ReactQuill.Value,
): Command => {
  const cardStore = useCardsStore.getState();

  return {
    type: 'MODIFY_TEXT_LAYER',
    execute: () => {
      cardStore.setTextLayer(cardId, layerId, text);
    },
    undo: () => {
      cardStore.setTextLayer(cardId, layerId, initialText);
    },
  };
};

export const createModifyImageLayerCommand = (cardId: number, layerId: number, image: Image): Command => {
  const cardStore = useCardsStore.getState();
  const previousImage = cardStore.getImageLayer(cardId, layerId);

  if (!previousImage) throw new Error(`Image not found: ${layerId}`);

  return {
    type: 'MODIFY_IMAGE_LAYER',
    execute: () => {
      cardStore.setImageLayer(cardId, layerId, image);
    },
    undo: () => {
      cardStore.setImageLayer(cardId, layerId, previousImage);
    },
  };
};

export const createModifyShapeLayerCommand = (
  cardId: number,
  layerId: number,
  color: string,
  initialColor: string,
): Command => {
  const cardStore = useCardsStore.getState();

  return {
    type: 'MODIFY_SHAPE_LAYER',
    execute: () => {
      cardStore.setShapeLayerColor(cardId, layerId, color);
    },
    undo: () => {
      cardStore.setShapeLayerColor(cardId, layerId, initialColor);
    },
  };
};

export const createModifyLayerPositionCommand = (cardId: number, layerId: number, position: Position): Command => {
  const cardStore = useCardsStore.getState();
  const previousPosition = cardStore.getPosition(cardId, layerId);

  if (!previousPosition) throw new Error(`Position not found: ${layerId}`);

  return {
    type: 'MODIFY_POSITION',
    execute: () => {
      cardStore.setPosition(cardId, layerId, position);
    },
    undo: () => {
      cardStore.setPosition(cardId, layerId, previousPosition);
    },
  };
};

export const createCopyCommand = (cardId: number, layerId: number): Command => {
  const cardStore = useCardsStore.getState();
  const commandStore = useCommandStore.getState();

  return {
    type: 'COPY_LAYER',
    execute: () => {
      const layer = cardStore.getLayer(cardId, layerId);
      if (layer) commandStore.setClipboard(layer);
    },
    undo: () => {
      commandStore.setClipboard(null);
    },
  };
};

export const createPasteCommand = (cardId: number): Command => {
  const cardStore = useCardsStore.getState();
  const commandStore = useCommandStore.getState();
  const clipboardLayer = commandStore.clipboard;

  if (!clipboardLayer) throw new Error('Nothing to paste');

  const newLayer = cardStore.getNewLayer(cardId, JSON.parse(JSON.stringify(clipboardLayer)));
  if (!newLayer) throw new Error('Failed to paste layer');

  const { layerId, layerData } = newLayer;

  return {
    type: 'PASTE_LAYER',
    execute: () => {
      cardStore.addLayer(cardId, layerData);
    },
    undo: () => {
      cardStore.deleteLayer(cardId, layerId);
    },
  };
};
