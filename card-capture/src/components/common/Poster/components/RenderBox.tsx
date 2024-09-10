import React from 'react';
import { Position } from '@/store/useCardsStore/type';

type RenderBoxProps = {
  children: React.ReactNode;
  position: Position;
  ratio: number;
};

const RenderBox = ({ children, position, ratio }: RenderBoxProps) => {
  return (
    <div
      style={{
        transform: `scale(${ratio})`,
        transformOrigin: 'top left',
      }}
    >
      <div
        className="absolute"
        style={{
          left: position.x,
          top: position.y,
          width: position.width,
          height: position.height,
          transform: `rotate(${position.rotate}deg)`,
          transformOrigin: 'center',
          zIndex: position.zIndex,
          opacity: position.opacity / 100,
          boxSizing: 'border-box',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-start p-3">{children}</div>
      </div>
    </div>
  );
};

export default RenderBox;
