//FocusBox.tsx

import { useCardsStore } from '@/store/useCardsStore';
import { Position } from '@/store/useCardsStore/type';
import { useEffect, useState } from 'react';

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

type Direction = 'none' | 's' | 'w' | 'e' | 'n' | 'ne' | 'nw' | 'se' | 'sw';

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
  const [offset, setOffset] = useState<Offset>({ ...INITIALOFFSET }); // 위치이동시 사용되는 임시 변수
  const [resizeOffset, setResizeOffset] = useState<ResizeOffset>({
    ...INITIALRESIZEOFFSET,
  }); // 크기 조절시 사용되는 임시 변수

  const [resizeState, setResizeState] = useState<Direction>('none');

  //클릭해도 Focus상태가 풀리지 않게하기위한 이벤트 전파 방지
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  /* 드래그 관련 로직 */
  //@FIXME: 드래그 이벤트도 window에서 동작하게 하는것이 필요함
  const mouseDownDragHandler = (e: React.MouseEvent) => {
    setIsDrag(true);
    setOffset(prev => {
      return {
        ...prev,
        y: e.clientY - layer.position.y,
        x: e.clientX - layer.position.x,
      };
    });
  };

  const mouseMoveDragHandler = (e: React.MouseEvent) => {
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

  //이동이 끝날 때 cardStore에 저장
  const mouseUpDragHandler = (e: React.MouseEvent) => {
    const diffX = e.clientX - offset.x;
    const diffY = e.clientY - offset.y;

    setOffset({ ...INITIALOFFSET });
    setIsDrag(false);
    setPosition(layerId, { ...curPosition, y: diffY, x: diffX });
  };

  /* 크기 resize 로직 */

  //MOUSEDOWN 핸들러
  const resizeMouseDownHandler = (
    e: React.MouseEvent,
    direction: Direction,
  ) => {
    e.stopPropagation();

    setResizeState(direction);

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

  /* resize 좌표 계산 함수들 */
  const calculateN = (e: MouseEvent) => {
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, height, y };
  };

  const calculateS = (e: MouseEvent) => {
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, height };
  };

  const calculateE = (e: MouseEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth + diffX;

    return { ...curPosition, width };
  };

  const calculateW = (e: MouseEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;

    return { ...curPosition, width, x };
  };

  const calculateNE = (e: MouseEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth + diffX;
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, width, height, y };
  };
  const calculateNW = (e: MouseEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, width, height, x, y };
  };
  const calculateSE = (e: MouseEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, width, height, x };
  };
  const calculateSW = (e: MouseEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth + diffX;
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, width, height };
  };

  // resize MouseMove 공통 로직
  const resizeMouseMoveWrap = (
    e: MouseEvent,
    calculateFn: (e: MouseEvent) => Position,
  ) => {
    // 공통 로직
    e.stopPropagation();
    if (resizeState === 'none') return;

    const { width, height, x, y } = calculateFn(e);

    //@NOTE: 박스크기는 변경하지만 이동중에 cardStore를 변경하진 않음
    setCurPosition(prev => {
      return { ...prev, width, height, x, y };
    });
  };

  /* resize MouseMove Handler 정의 */
  const resizeEHandler = (e: MouseEvent) => resizeMouseMoveWrap(e, calculateE);
  const resizeWHandler = (e: MouseEvent) => resizeMouseMoveWrap(e, calculateW);
  const resizeNHandler = (e: MouseEvent) => resizeMouseMoveWrap(e, calculateN);
  const resizeSHandler = (e: MouseEvent) => resizeMouseMoveWrap(e, calculateS);

  const resizeNEHandler = (e: MouseEvent) =>
    resizeMouseMoveWrap(e, calculateNE);
  const resizeNWHandler = (e: MouseEvent) =>
    resizeMouseMoveWrap(e, calculateNW);
  const resizeSEHandler = (e: MouseEvent) =>
    resizeMouseMoveWrap(e, calculateSE);
  const resizeSWHandler = (e: MouseEvent) =>
    resizeMouseMoveWrap(e, calculateSW);

  //resize MouseUp 공통 로직
  const resizeMouseUpHandlerWrap = (
    e: MouseEvent,
    calculateFn: (e: MouseEvent) => Position,
  ) => {
    e.stopPropagation();

    const { width, height, x, y } = calculateFn(e);

    //공통로직
    setResizeOffset({ ...INITIALRESIZEOFFSET });
    setResizeState('none');
    setPosition(layerId, { ...curPosition, width, height, x, y });
  };

  /* resize MouseUp 이벤트 정의 */
  const resizeEMouseUpHandler = (e: MouseEvent) =>
    resizeMouseUpHandlerWrap(e, calculateE);

  const resizeWMouseUpHandler = (e: MouseEvent) =>
    resizeMouseUpHandlerWrap(e, calculateW);

  const resizeSMouseUpHandler = (e: MouseEvent) =>
    resizeMouseUpHandlerWrap(e, calculateS);

  const resizeNMouseUpHandler = (e: MouseEvent) =>
    resizeMouseUpHandlerWrap(e, calculateN);

  const resizeNEMouseUpHandler = (e: MouseEvent) =>
    resizeMouseUpHandlerWrap(e, calculateNE);

  const resizeNWMouseUpHandler = (e: MouseEvent) =>
    resizeMouseUpHandlerWrap(e, calculateNW);

  const resizeSEMouseUpHandler = (e: MouseEvent) =>
    resizeMouseUpHandlerWrap(e, calculateSE);

  const resizeSWMouseUpHandler = (e: MouseEvent) =>
    resizeMouseUpHandlerWrap(e, calculateSW);

  //resize Handler MAP
  //if문 사용을 안하기 위해 채택
  const resizeMouseMoveHandlerMap = {
    n: resizeNHandler,
    e: resizeEHandler,
    s: resizeSHandler,
    w: resizeWHandler,
    nw: resizeNWHandler,
    ne: resizeNEHandler,
    sw: resizeSWHandler,
    se: resizeSEHandler,
  };

  const resizeMouseUpHandlerMap = {
    n: resizeNMouseUpHandler,
    e: resizeEMouseUpHandler,
    s: resizeSMouseUpHandler,
    w: resizeWMouseUpHandler,
    nw: resizeNWMouseUpHandler,
    ne: resizeNEMouseUpHandler,
    sw: resizeSWMouseUpHandler,
    se: resizeSEMouseUpHandler,
  };

  //resize 이벤트 등록
  useEffect(() => {
    if (resizeState === 'none') return;

    window.addEventListener(
      'mousemove',
      resizeMouseMoveHandlerMap[resizeState],
    );
    window.addEventListener('mouseup', resizeMouseUpHandlerMap[resizeState]);

    return () => {
      window.removeEventListener(
        'mousemove',
        resizeMouseMoveHandlerMap[resizeState],
      );
      window.removeEventListener(
        'mouseup',
        resizeMouseUpHandlerMap[resizeState],
      );
    };
  }, [resizeState]);

  return (
    <div
      className={`absolute border ${isDrag ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: curPosition.x,
        top: curPosition.y,
        width: curPosition.width,
        height: curPosition.height,
        zIndex: 10000, //NOTE: focus되면 z-index가 상위로 와야함 (수치는 회의해야함!)
        opacity: curPosition.opacity,
      }}
      onMouseDown={mouseDownDragHandler}
      onMouseMove={mouseMoveDragHandler}
      onMouseUp={mouseUpDragHandler}
      onClick={stopPropagation}
    >
      {/* 11시,1시,5시,7시 크기조절 바 */}
      <div
        className="absolute -top-4 -left-4 border w-2 h-2 bg-slate-200 cursor-nwse-resize rounded-sm"
        onMouseDown={e => resizeMouseDownHandler(e, 'nw')}
      ></div>
      <div
        className="absolute -top-4 -right-4 border w-2 h-2 bg-slate-200 cursor-nesw-resize rounded-sm"
        onMouseDown={e => resizeMouseDownHandler(e, 'ne')}
      ></div>
      <div
        className="absolute -bottom-4 -left-4 border w-2 h-2 bg-slate-200 cursor-nesw-resize rounded-sm"
        onMouseDown={e => resizeMouseDownHandler(e, 'se')}
      ></div>
      <div
        className="absolute -bottom-4 -right-4 border w-2 h-2 bg-slate-200 cursor-nwse-resize rounded-sm"
        onMouseDown={e => resizeMouseDownHandler(e, 'sw')}
      ></div>
      {/* 크기조절 바탕선 */}
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
        onMouseDown={e => resizeMouseDownHandler(e, 'n')}
      ></div>
      <div
        className="absolute border -right-4 top-1/2 w-2 h-6 bg-slate-200 -translate-y-1/2 rounded-sm cursor-col-resize"
        onMouseDown={e => resizeMouseDownHandler(e, 'e')}
      ></div>
      <div
        className="absolute border -bottom-4 left-2/4 w-6 h-2 bg-slate-200 -translate-x-1/2 rounded-sm cursor-row-resize"
        onMouseDown={e => resizeMouseDownHandler(e, 's')}
      ></div>
      <div
        className="absolute border -left-4 top-1/2 w-2 h-6 bg-slate-200 -translate-y-1/2 rounded-sm cursor-col-resize"
        onMouseDown={e => resizeMouseDownHandler(e, 'w')}
      ></div>
      {component}
    </div>
  );
};

export default FocusBox;
