//ShapeBox.tsx

import { Shape } from '@/store/useCardsStore/type';

type Props = {
  shapeType: Shape['type'];
  color: string;
};
const ShapeBox = ({ shapeType, color }: Props) => {
  //@TODO svg 파일로 변경해야함. 후에는 svg 파일을 렌더링만 하도록 수정

  if (shapeType === 'rect') {
    return <div className="h-full w-full" style={{ background: color }}></div>;
  }

  if (shapeType === 'circle') {
    return (
      <div
        className="h-full w-full"
        style={{
          borderRadius: '50%',
          background: color,
        }}
      ></div>
    );
  }

  if (shapeType === 'triangle') {
    return (
      <div className="h-full w-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 0,100 100,100" fill={color} />
        </svg>
      </div>
    );
  }

  if (shapeType === 'star') {
    return (
      <div className="h-full w-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill={color} />
        </svg>
      </div>
    );
  }
};

export default ShapeBox;
