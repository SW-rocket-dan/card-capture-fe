//FocusBox.tsx

import { useCardsStore } from '@/store/useCardsStore';
import { useState } from 'react';

type Props = {
  component: JSX.Element;
  layerId: number;
};

const INITIALOFFSET = Object.freeze({
  y: 0,
  x: 0,
  width: 0,
  height: 0,
});

const INITIALRESIZEOFFSET = Object.freeze({
  startClientX: 0,
  startClientY: 0,
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
});

type Offset = {
  y: number;
  x: number;
};

type ResizeOffset = {
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
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
  const [offset, setOffset] = useState<Offset>({ ...INITIALOFFSET });
  const [resizeOffset, setResizeOffset] = useState<ResizeOffset>({
    ...INITIALRESIZEOFFSET,
  });

  const [isResizing, setIsResizing] = useState(false);

  //클릭해도 Focus상태가 풀리지 않게
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  /* 드래그 관련 로직 */
  //드레그 이벤트를 해당  하면 마우스가 빠르게 움직일 시 무시될 수 있음 <- 조치 필요 ( 혹은 회의 필요 )
  const mouseDownHandler = (e: React.MouseEvent) => {
    setIsDrag(true);
    setOffset(prev => {
      return {
        ...prev,
        y: e.clientY - layer.position.y,
        x: e.clientX - layer.position.x,
      };
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

    setOffset({ ...INITIALOFFSET });
    setIsDrag(false);
    setPosition(layerId, { ...curPosition, y: diffY, x: diffX });
  };

  /* 크기 resize 로직 */
  // 리팩토링 필요 로직 ( 묶어낼 수 있을걸로 보임 )
  // 현재 마우스가 너무 빠르면 이벤트 리스너가 부착안된곳으로 커서가 가서 이동이 안되는 버그 존재
  const resizeMouseDownHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsResizing(true);
    setResizeOffset(prev => {
      return {
        ...prev,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startX: curPosition.x,
        startY: curPosition.y,
        startWidth: curPosition.width,
        startHeight: curPosition.height,
      };
    });
  };

  const resizeRightHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isResizing) return;
    const diff = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth + diff;

    setCurPosition(prev => {
      return {
        ...prev,
        width,
      };
    });
  };

  const resizeLeftHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isResizing) return;
    const diff = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth - diff;
    const x = resizeOffset.startX + diff;
    setCurPosition(prev => {
      return {
        ...prev,
        width,
        x,
      };
    });
  };

  const resizeTopHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isResizing) return;
    const diff = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight - diff;
    const y = resizeOffset.startY + diff;
    setCurPosition(prev => {
      return {
        ...prev,
        height,
        y,
      };
    });
  };

  const resizeBottomHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isResizing) return;
    const diff = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight + diff;

    setCurPosition(prev => {
      return {
        ...prev,
        height,
      };
    });
  };

  const resizeRightMouseUpHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const diff = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth + diff;

    setResizeOffset({ ...INITIALRESIZEOFFSET });
    setIsResizing(false);
    setPosition(layerId, { ...curPosition, width });
  };

  const resizeLeftMouseUpHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const diff = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth - diff;
    const x = resizeOffset.startX + diff;

    setResizeOffset({ ...INITIALRESIZEOFFSET });
    setIsResizing(false);
    setPosition(layerId, { ...curPosition, width, x });
  };

  const resizeBottomMouseUpHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const diff = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight + diff;

    setResizeOffset({ ...INITIALRESIZEOFFSET });
    setIsResizing(false);
    setPosition(layerId, { ...curPosition, height });
  };

  const resizeTopMouseUpHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const diff = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight - diff;
    const y = resizeOffset.startY + diff;

    setResizeOffset({ ...INITIALRESIZEOFFSET });
    setIsResizing(false);
    setPosition(layerId, { ...curPosition, height, y });
  };

  console.log(layer.position);
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
      onClick={stopPropagation}
    >
      {/* 11시,1시,5시,7시 크기조절 바 */}
      <div className="absolute -top-4 -left-4 border w-2 h-2 bg-slate-200 cursor-nwse-resize rounded-sm"></div>
      <div className="absolute -top-4 -right-4 border w-2 h-2 bg-slate-200 cursor-nesw-resize rounded-sm"></div>
      <div className="absolute -bottom-4 -left-4 border w-2 h-2 bg-slate-200 cursor-nwse-resize rounded-sm"></div>
      <div className="absolute -bottom-4 -right-4 border w-2 h-2 bg-slate-200 cursor-nesw-resize rounded-sm"></div>
      {/* 대각선 */}
      <div
        className="absolute border -top-3 -left-3 -z-10"
        onMouseDown={stopPropagation}
        onMouseMove={stopPropagation}
        onMouseUp={stopPropagation}
        style={{
          width: curPosition.width + 23,
          height: curPosition.height + 23,
        }}
      ></div>
      {/* 12시,3시,6시,9시 크기조절 바 */}
      <div
        className="absolute border -top-4 left-2/4 w-6 h-2 bg-slate-200 -translate-x-1/2 rounded-sm cursor-row-resize"
        onMouseDown={resizeMouseDownHandler}
        onMouseMove={resizeTopHandler}
        onMouseUp={resizeTopMouseUpHandler}
      ></div>
      <div
        className="absolute border -right-4 top-1/2 w-2 h-6 bg-slate-200 -translate-y-1/2 rounded-sm cursor-col-resize"
        onMouseDown={resizeMouseDownHandler}
        onMouseMove={resizeRightHandler}
        onMouseUp={resizeRightMouseUpHandler}
      ></div>
      <div
        className="absolute border -bottom-4 left-2/4 w-6 h-2 bg-slate-200 -translate-x-1/2 rounded-sm cursor-row-resize"
        onMouseDown={resizeMouseDownHandler}
        onMouseMove={resizeBottomHandler}
        onMouseUp={resizeBottomMouseUpHandler}
      ></div>
      <div
        className="absolute border -left-4 top-1/2 w-2 h-6 bg-slate-200 -translate-y-1/2 rounded-sm cursor-col-resize"
        onMouseDown={resizeMouseDownHandler}
        onMouseMove={resizeLeftHandler}
        onMouseUp={resizeLeftMouseUpHandler}
      ></div>
      {component}
    </div>
  );
};

export default FocusBox;
