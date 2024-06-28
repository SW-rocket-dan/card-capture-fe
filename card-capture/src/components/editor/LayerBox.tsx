//PositionBox.tsx

import { Position } from '@/store/useCardsStore/type';

type Props = {
  component: JSX.Element;
  position: Position;
  onClick: (e: React.MouseEvent) => void;
};

/**
 *
 * @param component Box안에 띄어줄 컴포넌트
 * @param position 위치정보에 따라서 위치를 렌더링해줌
 * @param onClick 클릭시 focusBox로 변경
 * @returns
 */
const LayerBox = ({ component, position, onClick }: Props) => {
  //고민해봐야할 부분 동적 스타일링은 tailwind로 쉽지않음
  //style로 바로 박을것인지, tailwind로 다 정의해 둘것인지, 혹은 css로할 것인지
  return (
    <div
      className={`absolute`}
      style={{
        left: position.x,
        top: position.y,
        width: position.width,
        height: position.height,
        zIndex: position.zIndex,
        opacity: position.opacity,
        transform: `rotate(${position.rotate}deg)`,
        transformOrigin: 'center',
      }}
      onClick={onClick}
    >
      {component}
    </div>
  );
};

export default LayerBox;
