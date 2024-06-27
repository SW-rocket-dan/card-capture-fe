//FocusBox.tsx

import { useCardsStore } from '@/store/useCardsStore';
import { Position } from '@/store/useCardsStore/type';
import { useEffect, useRef, useState } from 'react';
import { Direction, Offset, ResizeOffset } from './FocusBox.type';
import { FaArrowRotateLeft } from 'react-icons/fa6';

type Props = {
  component: JSX.Element;
  layerId: number;
};

const INITIAL_DRAG_OFFSET = Object.freeze({
  y: 0,
  x: 0,
  width: 0,
  height: 0,
});

const INITIAL_RESIZE_OFFSET = Object.freeze({
  startClientX: 0,
  startClientY: 0,
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  centerX: 0,
  centerY: 0,
});

/**
 * Focus(수정상태) 가 된 정보
 * @param component Box안에 띄어줄 컴포넌트
 * @param position 위치정보에 따라서 위치를 렌더링해줌
 * **/
const FocusBox = ({ component, layerId }: Props) => {
  //store update
  const layer = useCardsStore(
    state => state.cards[0].layers.filter(v => v.id === layerId)[0],
  );
  const setPosition = useCardsStore(state => state.setPosition);

  //drag
  const [isDrag, setIsDrag] = useState(false);

  //resize
  const [resizeState, setResizeState] = useState<Direction>('none');
  const [curPosition, setCurPosition] = useState(layer.position);

  const [dragOffset, setDragOffset] = useState<Offset>({
    ...INITIAL_DRAG_OFFSET,
  }); // 위치이동시 사용되는 임시 변수
  const [resizeOffset, setResizeOffset] = useState<ResizeOffset>({
    ...INITIAL_RESIZE_OFFSET,
  }); // 크기 조절시 사용되는 임시 변수

  //rotate
  const [isRotate, setIsRotate] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  //rotate + resize
  /**
   * 절대 좌표계 -> 상대 좌표계로 변경해주는 func
   */
  const rotatePoint = (
    x: number,
    y: number,
    centerX: number,
    centerY: number,
    angle: number,
  ) => {
    const radians = (angle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = cos * (x - centerX) + sin * (y - centerY) + centerX;
    const ny = cos * (y - centerY) - sin * (x - centerX) + centerY;
    return { x: nx, y: ny };
  };

  /**
   * 상대 좌표계 -> 절대 좌표계로 변경해주는 func
   */
  const unrotatePoint = (
    x: number,
    y: number,
    centerX: number,
    centerY: number,
    angle: number,
  ) => {
    const radians = (-angle * Math.PI) / 180;
    return rotatePoint(x, y, centerX, centerY, radians * (180 / Math.PI));
  };

  //클릭해도 Focus상태가 풀리지 않게하기위한 이벤트 전파 방지
  const stopPropagation = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  //              //
  /* 드래그 관련 로직 */
  //              //
  const mouseDownDragHandler = (e: React.PointerEvent) => {
    setIsDrag(true);

    setDragOffset(prev => {
      return {
        ...prev,
        y: e.clientY - layer.position.y,
        x: e.clientX - layer.position.x,
      };
    });
  };

  const PointerMoveDragHandler = (e: PointerEvent) => {
    if (!isDrag) return;
    const diffX = e.clientX - dragOffset.x;
    const diffY = e.clientY - dragOffset.y;
    setCurPosition(prev => {
      return {
        ...prev,
        x: diffX,
        y: diffY,
      };
    });
  };

  /**
   * @NOTE: 이동이 끝날 때 cardStore에 저장
   */
  const pointerUpDragHandler = (e: PointerEvent) => {
    const diffX = e.clientX - dragOffset.x;
    const diffY = e.clientY - dragOffset.y;

    setDragOffset({ ...INITIAL_DRAG_OFFSET });
    setIsDrag(false);
    setPosition(layerId, { ...curPosition, y: diffY, x: diffX });
  };

  /**
   * 드래그 이벤트 등록
   * @Note: 캡처링 단계에서 실행되는 이벤트
   */
  useEffect(() => {
    if (!isDrag) return;

    window.addEventListener('pointermove', PointerMoveDragHandler);
    window.addEventListener('pointerup', pointerUpDragHandler);

    return () => {
      window.removeEventListener('pointermove', PointerMoveDragHandler);
      window.removeEventListener('pointerup', pointerUpDragHandler);
    };
  }, [isDrag]);

  //                //
  /* 크기 resize 로직 */
  //                //

  /**
   * resize 시작 핸들러
   * @param direction 방향 (N,S,E,W,NE,NW,SE,SW)
   */
  const resizeMouseDownHandler = (
    e: React.PointerEvent,
    direction: Direction,
  ) => {
    e.stopPropagation();

    setResizeState(direction);

    // 요소 중앙 좌표 계산
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setResizeOffset(prev => {
      return {
        ...prev,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startX: curPosition.x,
        startY: curPosition.y,
        startWidth: curPosition.width,
        startHeight: curPosition.height,
        centerX,
        centerY,
      };
    });
  };

  //                     //
  /* resize 좌표 계산 함수들 */
  //                     //

  /**
   * 절대좌표계를 상대좌표계로 바꾸고 수치를 가져올 수 있음
   */
  const getDiffInRelative = (
    x: number,
    y: number,
    startX: number,
    startY: number,
  ) => {
    const relativeCoord = rotatePoint(
      x,
      y,
      resizeOffset.centerX,
      resizeOffset.centerY,
      curPosition.rotate,
    );

    const relativeStartCoord = rotatePoint(
      startX,
      startY,
      resizeOffset.centerX,
      resizeOffset.centerY,
      curPosition.rotate,
    );

    return {
      diffX: relativeCoord.x - relativeStartCoord.x,
      diffY: relativeCoord.y - relativeStartCoord.y,
    };
  };

  //각 방향별 계산
  const calculateN = (e: PointerEvent, diffX: number, diffY: number) => {
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, height, y };
  };

  const calculateS = (e: PointerEvent, diffX: number, diffY: number) => {
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, height };
  };

  const calculateE = (e: PointerEvent, diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;

    return { ...curPosition, width };
  };

  const calculateW = (e: PointerEvent, diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;

    return { ...curPosition, width, x };
  };

  const calculateNE = (e: PointerEvent, diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, width, height, y };
  };
  const calculateNW = (e: PointerEvent, diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;
    const height = resizeOffset.startHeight - diffY;
    const y = resizeOffset.startY + diffY;

    return { ...curPosition, width, height, x, y };
  };
  const calculateSE = (e: PointerEvent, diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    const x = resizeOffset.startX + diffX;
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, width, height, x };
  };
  const calculateSW = (e: PointerEvent, diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;
    const height = resizeOffset.startHeight + diffY;

    return { ...curPosition, width, height };
  };

  // resize PointerMove 공통 로직
  const resizePointerMoveWrap = (
    e: PointerEvent,
    calculateFn: (e: PointerEvent, diffX: number, diffY: number) => Position,
  ) => {
    // 공통 로직
    e.stopPropagation();
    if (resizeState === 'none') return;

    //상대좌표계에서의 diff를 계산
    const { diffX, diffY } = getDiffInRelative(
      e.clientX,
      e.clientY,
      resizeOffset.startClientX,
      resizeOffset.startClientY,
    );
    console.log(diffX, diffY);

    const { width, height, x, y } = calculateFn(e, diffX, diffY);

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
    calculateFn: (e: PointerEvent, diffX: number, diffY: number) => Position,
  ) => {
    e.stopPropagation();

    const { diffX, diffY } = getDiffInRelative(
      e.clientX,
      e.clientY,
      resizeOffset.startClientX,
      resizeOffset.startClientY,
    );
    const { width, height, x, y } = calculateFn(e, diffX, diffY);
    console.log('width', width, 'height', height);
    console.log('x', x, 'y', y);

    //공통로직
    setResizeOffset({ ...INITIAL_RESIZE_OFFSET });
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

  //            //
  /* rotate 로직 */
  //            //
  const pointerDownRotateHandler = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsRotate(true);
  };

  const pointerMoveRotateHandler = (e: PointerEvent) => {
    e.stopPropagation();
    if (!isRotate) return;

    // 요소의 중심점 계산
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 다음 각도 계산
    //@NOTE: arctan을 활용한 각도 구하기
    const nxAngle = Math.atan2(e.clientX - centerX, centerY - e.clientY);
    let rotationDegrees = nxAngle * (180 / Math.PI); //라디안 변경

    setCurPosition(prev => ({
      ...prev,
      rotate: rotationDegrees,
    }));
  };

  const pointerUpRotateHandler = (e: PointerEvent) => {
    e.stopPropagation();
    setIsRotate(false);
    // 요소의 중심점 계산
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 다음 각도 계산
    //@NOTE: arctan을 활용한 각도 구하기
    const nxAngle = Math.atan2(e.clientX - centerX, centerY - e.clientY);
    let rotationDegrees = nxAngle * (180 / Math.PI); //라디안 변경
    setPosition(layerId, { ...curPosition, rotate: rotationDegrees });
  };

  //rotate 이벤트 등록
  //@NOTE : 캡처링 단계에서 실행되는 이벤트
  useEffect(() => {
    if (!isRotate) return;
    window.addEventListener('pointermove', pointerMoveRotateHandler, true);
    window.addEventListener('pointerup', pointerUpRotateHandler, true);

    return () => {
      window.removeEventListener('pointermove', pointerMoveRotateHandler, true);
      window.removeEventListener('pointerup', pointerUpRotateHandler, true);
    };
  }, [isRotate]);

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
        transform: `rotate(${curPosition.rotate}deg)`,
        transformOrigin: 'center',
      }}
      onPointerDown={mouseDownDragHandler}
      onClick={stopPropagation}
      ref={boxRef}
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
      {/* rotate button */}
      <div
        className="absolute -top-10 left-2/4  -translate-x-1/2 bg-slate-200 rounded-full w-3 h-3 flex justify-center items-center"
        onPointerDown={pointerDownRotateHandler}
      >
        <FaArrowRotateLeft size={8} />
      </div>
      {component}
    </div>
  );
};

export default FocusBox;
