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
    return (
      <div
        className="w-full h-full"
        style={{
          borderRadius: '50%',
          background: color,
        }}
      ></div>
    );
  }

  if (shapeType === 'triangle') {
    return (
      <div
        className="w-full h-full"
        style={{
          position: 'absolute',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          backgroundColor: color, // 색상은 원하는 대로 변경 가능
        }}
      ></div>
    );
  }

  if (shapeType === 'star') {
    return (
      <div
        className="w-full h-full"
        style={{
          clipPath:
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          backgroundColor: color, // 색상은 원하는 대로 변경 가능
        }}
      ></div>
    );
  }
};

export default ShapeBox;
