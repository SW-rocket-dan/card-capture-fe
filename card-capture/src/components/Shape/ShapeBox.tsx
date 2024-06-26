//Shape.tsx

import { Shape } from '@/store/useCardsStore/type';

type Props = {
  shapeType: Shape['type'];
  color: string;
};
const ShapeBox = ({ shapeType, color }: Props) => {
  if (shapeType === 'rect') {
    return <div className="w-full h-full" style={{ background: color }}></div>;
  }

  if (shapeType === 'circle') {
  }

  if (shapeType === 'triangle') {
    return <div className="w-full h-full">{shapeType}</div>;
  }
};

export default ShapeBox;
