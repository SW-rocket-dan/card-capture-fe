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
  const stopPropagation = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  /* 드래그 관련 로직 */
  const mouseDownDragHandler = (e: React.PointerEvent) => {
    setIsDrag(true);

    setOffset(prev => {
      return {
        ...prev,
        y: e.clientY - layer.position.y,
        x: e.clientX - layer.position.x,
      };
    });
  };

  const PointerMoveDragHandler = (e: PointerEvent) => {
    console.log('in');
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
  const pointerUpDragHandler = (e: PointerEvent) => {
    const diffX = e.clientX - offset.x;
    const diffY = e.clientY - offset.y;

    setOffset({ ...INITIALOFFSET });
    setIsDrag(false);
    setPosition(layerId, { ...curPosition, y: diffY, x: diffX });
  };

  /**
   * 드래그 이벤트 등록
   * @Note: 캡처링 단계에서 실행되는 이벤트
   */
  useEffect(() => {
    if (!isDrag) return;

    window.addEventListener('pointermove', PointerMoveDragHandler, true);
    window.addEventListener('pointerup', pointerUpDragHandler, true);

    return () => {
      window.removeEventListener('pointermove', PointerMoveDragHandler, true);
      window.removeEventListener('pointerup', pointerUpDragHandler, true);
    };
  }, [isDrag]);

  /* 크기 resize 로직 */

  //MOUSEDOWN 핸들러
  const resizeMouseDownHandler = (
    e: React.PointerEvent,
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
  const calculateN = (e: PointerEvent) => {
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, height, y };
  };

  const calculateS = (e: PointerEvent) => {
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, height };
  };

  const calculateE = (e: PointerEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth + diffX;

    return { ...curPosition, width };
  };

  const calculateW = (e: PointerEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;

    return { ...curPosition, width, x };
  };

  const calculateNE = (e: PointerEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth + diffX;
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, width, height, y };
  };
  const calculateNW = (e: PointerEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, width, height, x, y };
  };
  const calculateSE = (e: PointerEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, width, height, x };
  };
  const calculateSW = (e: PointerEvent) => {
    const diffX = e.clientX - resizeOffset.startClientX;
    const width = resizeOffset.startWidth + diffX;
    const diffY = e.clientY - resizeOffset.startClientY;
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, width, height };
  };

  // resize PointerMove 공통 로직
  const resizePointerMoveWrap = (
    e: PointerEvent,
    calculateFn: (e: PointerEvent) => Position,
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

  /* resize PointerMove Handler 정의 */
  const resizeEHandler = (e: PointerEvent) =>
    resizePointerMoveWrap(e, calculateE);
  const resizeWHandler = (e: PointerEvent) =>
    resizePointerMoveWrap(e, calculateW);
  const resizeNHandler = (e: PointerEvent) =>
    resizePointerMoveWrap(e, calculateN);
  const resizeSHandler = (e: PointerEvent) =>
    resizePointerMoveWrap(e, calculateS);

  const resizeNEHandler = (e: PointerEvent) =>
    resizePointerMoveWrap(e, calculateNE);
  const resizeNWHandler = (e: PointerEvent) =>
    resizePointerMoveWrap(e, calculateNW);
  const resizeSEHandler = (e: PointerEvent) =>
    resizePointerMoveWrap(e, calculateSE);
  const resizeSWHandler = (e: PointerEvent) =>
    resizePointerMoveWrap(e, calculateSW);

  /**
   * resize PointerUp 공통 로직
   * @param e
   * @param calculateFn
   */
  const resizePointerUpHandlerWrap = (
    e: PointerEvent,
    calculateFn: (e: PointerEvent) => Position,
  ) => {
    e.stopPropagation();

    const { width, height, x, y } = calculateFn(e);

    //공통로직
    setResizeOffset({ ...INITIALRESIZEOFFSET });
    setResizeState('none');
    setPosition(layerId, { ...curPosition, width, height, x, y });
  };

  /* resize PointerUp 이벤트 정의 */
  const resizeEPointerUpHandler = (e: PointerEvent) =>
    resizePointerUpHandlerWrap(e, calculateE);

  const resizeWPointerUpHandler = (e: PointerEvent) =>
    resizePointerUpHandlerWrap(e, calculateW);

  const resizeSPointerUpHandler = (e: PointerEvent) =>
    resizePointerUpHandlerWrap(e, calculateS);

  const resizeNPointerUpHandler = (e: PointerEvent) =>
    resizePointerUpHandlerWrap(e, calculateN);

  const resizeNEPointerUpHandler = (e: PointerEvent) =>
    resizePointerUpHandlerWrap(e, calculateNE);

  const resizeNWPointerUpHandler = (e: PointerEvent) =>
    resizePointerUpHandlerWrap(e, calculateNW);

  const resizeSEPointerUpHandler = (e: PointerEvent) =>
    resizePointerUpHandlerWrap(e, calculateSE);

  const resizeSWPointerUpHandler = (e: PointerEvent) =>
    resizePointerUpHandlerWrap(e, calculateSW);

  //resize Handler MAP
  //if문 사용을 안하기 위해 채택
  const resizePointerMoveHandlerMap = {
    n: resizeNHandler,
    e: resizeEHandler,
    s: resizeSHandler,
    w: resizeWHandler,
    nw: resizeNWHandler,
    ne: resizeNEHandler,
    sw: resizeSWHandler,
    se: resizeSEHandler,
  };

  const resizePointerUpHandlerMap = {
    n: resizeNPointerUpHandler,
    e: resizeEPointerUpHandler,
    s: resizeSPointerUpHandler,
    w: resizeWPointerUpHandler,
    nw: resizeNWPointerUpHandler,
    ne: resizeNEPointerUpHandler,
    sw: resizeSWPointerUpHandler,
    se: resizeSEPointerUpHandler,
  };

  //resize 이벤트 등록
  //@NOTE : 캡처링 단계에서 실행되는 이벤트
  useEffect(() => {
    if (resizeState === 'none') return;

    window.addEventListener(
      'pointermove',
      resizePointerMoveHandlerMap[resizeState],
      true,
    );
    window.addEventListener(
      'pointerup',
      resizePointerUpHandlerMap[resizeState],
      true,
    );

    return () => {
      window.removeEventListener(
        'pointermove',
        resizePointerMoveHandlerMap[resizeState],
        true,
      );
      window.removeEventListener(
        'pointerup',
        resizePointerUpHandlerMap[resizeState],
        true,
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
      onPointerDown={mouseDownDragHandler}
      onClick={stopPropagation}
    >
      {/* 11시,1시,5시,7시 크기조절 바 */}
      <div
        className="absolute -top-4 -left-4 border w-2 h-2 bg-slate-200 cursor-nwse-resize rounded-sm"
        onPointerDown={e => resizeMouseDownHandler(e, 'nw')}
      ></div>
      <div
        className="absolute -top-4 -right-4 border w-2 h-2 bg-slate-200 cursor-nesw-resize rounded-sm"
        onPointerDown={e => resizeMouseDownHandler(e, 'ne')}
      ></div>
      <div
        className="absolute -bottom-4 -left-4 border w-2 h-2 bg-slate-200 cursor-nesw-resize rounded-sm"
        onPointerDown={e => resizeMouseDownHandler(e, 'se')}
      ></div>
      <div
        className="absolute -bottom-4 -right-4 border w-2 h-2 bg-slate-200 cursor-nwse-resize rounded-sm"
        onPointerDown={e => resizeMouseDownHandler(e, 'sw')}
      ></div>
      {/* 크기조절 바탕선 */}
      <div
        className="absolute border -top-3 -left-3 -z-10"
        onPointerDown={stopPropagation}
        onPointerMove={stopPropagation}
        onPointerUp={stopPropagation}
        style={{
          width: curPosition.width + 23,
          height: curPosition.height + 23,
        }}
      ></div>
      {/* 12시,3시,6시,9시 크기조절 바 */}
      <div
        className="absolute border -top-4 left-2/4 w-6 h-2 bg-slate-200 -translate-x-1/2 rounded-sm cursor-row-resize"
        onPointerDown={e => resizeMouseDownHandler(e, 'n')}
      ></div>
      <div
        className="absolute border -right-4 top-1/2 w-2 h-6 bg-slate-200 -translate-y-1/2 rounded-sm cursor-col-resize"
        onPointerDown={e => resizeMouseDownHandler(e, 'e')}
      ></div>
      <div
        className="absolute border -bottom-4 left-2/4 w-6 h-2 bg-slate-200 -translate-x-1/2 rounded-sm cursor-row-resize"
        onPointerDown={e => resizeMouseDownHandler(e, 's')}
      ></div>
      <div
        className="absolute border -left-4 top-1/2 w-2 h-6 bg-slate-200 -translate-y-1/2 rounded-sm cursor-col-resize"
        onPointerDown={e => resizeMouseDownHandler(e, 'w')}
      ></div>
      {component}
    </div>
  );
};

export default FocusBox;
