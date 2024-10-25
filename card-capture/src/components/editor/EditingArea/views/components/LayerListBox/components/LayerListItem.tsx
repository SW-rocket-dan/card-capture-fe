import { AlignJustify } from 'lucide-react';
import { isIllustContent, isImageContent, isShapeContent, isTextContent, Layer } from '@/store/useCardsStore/type';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import { useFocusStore } from '@/store/useFocusStore';
import React from 'react';
import { useCardsStore } from '@/store/useCardsStore';
import ShapeBox from '@/components/editor/EditingArea/components/ShapeBox/ShapeBox';
import ImageBox from '@/components/editor/EditingArea/components/ImageBox/ImageBox';
import IllustBox from '@/components/editor/EditingArea/components/IllustBox/IllustBox';
import ReadOnlyTextBox from '@/components/common/Poster/components/ReadOnlyTextBox';

type LayerListItemProps = {
  cardId: number;
  layer: Layer;
};

const LayerListItem = ({ cardId, layer }: LayerListItemProps) => {
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const setFocusedLayerId = useFocusStore(state => state.setFocusedLayerId);
  const isFocused = focusedLayerId === layer.id;

  const focusLayerHandler = () => {
    setFocusedLayerId(layer.id);
  };

  const deleteLayer = useCardsStore(state => state.deleteLayer);

  const deleteLayerHandler = () => {
    deleteLayer(cardId, layer.id);
  };

  return (
    <div
      className={`flex w-full flex-row items-center gap-3 rounded border border-border px-2.5 py-[8px] ${isFocused ? 'bg-light-main' : 'bg-white'}`}
      onDoubleClick={focusLayerHandler}
    >
      <div className="flex flex-row gap-2">
        {/*<EyeIcon width={13} />*/}
        <button onClick={deleteLayerHandler}>
          <TrashIcon width={13} />
        </button>
      </div>

      <div className="flex flex-1 flex-row items-center gap-3">
        <div className="relative h-8 w-8 border border-border bg-white p-1">
          <div
            className="absolute flex h-full w-full items-center justify-center"
            style={{
              width: layer.position.width,
              height: layer.position.height,
              transform: `scale(${Math.min(26 / layer.position.width, 26 / layer.position.height)}) rotate(${layer.position.rotate}deg)`,
              transformOrigin: 'center',
              position: 'absolute',
              left: '50%',
              top: '50%',
              translate: '-50% -50%',
            }}
          >
            {layer.type === 'shape' && isShapeContent(layer.content) && (
              <ShapeBox shapeType={layer.content.type} color={layer.content.color} />
            )}
            {layer.type === 'image' && isImageContent(layer.content) && <ImageBox url={layer.content.url} />}
            {layer.type === 'illust' && isIllustContent(layer.content) && <IllustBox url={layer.content.url} />}
            {layer.type === 'text' && isTextContent(layer.content) && <ReadOnlyTextBox text={layer.content.content} />}
          </div>
        </div>
        <p className="text-xs">
          {layer.type} {layer.id + 1}
        </p>
      </div>
      <AlignJustify width={13} className="text-gray2" />
    </div>
  );
};

export default LayerListItem;
