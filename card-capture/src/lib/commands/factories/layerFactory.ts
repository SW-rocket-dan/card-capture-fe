import { Layer, LayerContentMap, LayerType, Position } from '@/store/useCardsStore/type';
import { BasePosition } from '@/lib/commands/type';

const BASE_POSITION: Omit<Partial<Position>, 'zIndex'> = {
  x: 200,
  y: 200,
  width: 200,
  height: 200,
  rotate: 0,
  opacity: 100,
};

const TEXT_POSITION: Omit<Partial<Position>, 'zIndex'> = {
  x: 190,
  y: 250,
  width: 200,
  height: 60,
  rotate: 0,
  opacity: 100,
};

const DEFAULT_POSITION: Record<LayerType, Partial<Position>> = {
  text: TEXT_POSITION,
  image: BASE_POSITION,
  shape: BASE_POSITION,
  illust: BASE_POSITION,
};

const DEFAULT_VALUES: Record<LayerType, LayerContentMap[LayerType]> = {
  text: { content: '' },
  shape: { type: 'rect', color: '#DDDDDD' },
  image: {
    url: '',
    cropStartX: 0,
    cropStartY: 0,
    cropWidth: 0,
    cropHeight: 0,
  },
  illust: { url: '' },
};

export type LayerFactoryProps<T extends LayerType> = {
  type: T;
  id: number;
  zIndex: number;
  position?: Partial<BasePosition>;
  content?: Partial<LayerContentMap[T]>;
};

export const LayerFactory = {
  createLayer<T extends LayerType>({ type, id, zIndex, position, content }: LayerFactoryProps<T>): Layer {
    return {
      id,
      type,
      content: {
        ...DEFAULT_VALUES[type],
        ...(content as LayerContentMap[T]),
      },
      position: {
        ...DEFAULT_POSITION[type],
        ...position,
        zIndex,
      },
    } as Layer;
  },
};
