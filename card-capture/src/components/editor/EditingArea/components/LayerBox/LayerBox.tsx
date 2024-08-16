import React from 'react';
import { Position } from '@/store/useCardsStore/type';

type LayerBoxProps = {
  children: React.ReactNode;
  position: Position;
  onClick: (e: React.MouseEvent) => void;
};

/**
 * @param children Box안에 띄어줄 컴포넌트
 * @param position 위치정보에 따라서 위치를 렌더링해줌
 * @param onClick 클릭시 focusBox로 변경
 */
const LayerBox = ({ children, position, onClick }: LayerBoxProps) => {
  const commonStyles = {
    left: position.x,
    top: position.y,
    width: position.width,
    height: position.height,
    transform: `rotate(${position.rotate}deg)`,
    transformOrigin: 'center',
  };

  return (
    <>
      {/* Border layer */}
      <div
        className="absolute border-2 border-transparent hover:border-main"
        style={{
          ...commonStyles,
          zIndex: 1000,
        }}
        onMouseDown={onClick}
      />

      {/* Content layer */}
      <div
        className="absolute"
        style={{
          ...commonStyles,
          zIndex: position.zIndex,
          opacity: position.opacity / 100,
          boxSizing: 'border-box',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-start p-3">{children}</div>
      </div>
    </>
  );
};

export default LayerBox;
