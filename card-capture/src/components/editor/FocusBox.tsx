//FocusBox.tsx

import { useCardsStore } from '@/store/useCardsStore';
import { useState } from 'react';

type Props = {
  component: JSX.Element;
  layerId: number;
};

/**
 * Focus(수정상태) 가 된 정보
 * @param component Box안에 띄어줄 컴포넌트
 * @param position 위치정보에 따라서 위치를 렌더링해줌
 * **/
const FocusBox = ({ component, layerId }: Props) => {
  const layer = useCardsStore(
    state => state.cards[0].layers.filter(v => v.id === layerId)[0],
  );
  const setPosition = useCardsStore(state => state.setPosition);

  const [isDrag, setIsDrag] = useState(false);
  const [curPosition, setCurPosition] = useState(layer.position);
  const [offset, setOffset] = useState({
    y: 0,
    x: 0,
  });

  //클릭해도 Focus상태가 풀리지 않게
  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  //드레그 이벤트를 해당 컴포넌트에서 하면 마우스가 빠르게 움직일 시 무시될 수 있음
  //조치 필요
  const mouseDownHandler = (e: React.MouseEvent) => {
    setIsDrag(true);
    setOffset({
      y: e.clientY - layer.position.y,
      x: e.clientX - layer.position.x,
    });
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!isDrag) return;
    const diffX = e.clientX - offset.x;
    const diffY = e.clientY - offset.y;

    setCurPosition(prev => {
      return {
        ...prev,
        x: diffX,
        y: diffY,
      };
    });
  };

  //이동이 끝날 때 전역상태가 업데이트 되도록
  const mouseUpHandler = (e: React.MouseEvent) => {
    const diffX = e.clientX - offset.x;
    const diffY = e.clientY - offset.y;

    setIsDrag(false);
    setPosition(layerId, { ...curPosition, y: diffY, x: diffX });
  };

  return (
    <div
      className="absolute border"
      style={{
        left: curPosition.x,
        top: curPosition.y,
        width: curPosition.width,
        height: curPosition.height,
        zIndex: 10000, // focus되면 z-index가 상위로 와야함 (수치는 회의해야함!)
        opacity: curPosition.opacity,
      }}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      onClick={onClickHandler}
    >
      {component}
    </div>
  );
};

export default FocusBox;
