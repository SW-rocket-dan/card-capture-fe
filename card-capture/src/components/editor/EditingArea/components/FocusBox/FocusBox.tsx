//FocusBox.tsx

import { useCardsStore } from '@/store/useCardsStore';
import { LayerType, Position } from '@/store/useCardsStore/type';
import React, { useEffect, useRef, useState } from 'react';
import { Direction, Offset, ResizeOffset } from './FocusBox.type';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { INITIAL_DRAG_OFFSET, INITIAL_RESIZE_OFFSET } from './FocusBox.constant';
import { useFocusStore } from '@/store/useFocusStore';

type Props = {
  children: React.ReactElement<{
    clickedCount: number;
  }>;
  cardId: number;
  layerId: number;
  type?: LayerType;
};

/**
 * Focus(수정상태) 가 된 정보
 * @param component Box안에 띄어줄 컴포넌트
 * @param position 위치정보에 따라서 위치를 렌더링해줌
 * **/
const FocusBox = ({ children, cardId, layerId, type }: Props) => {
  const layer = useCardsStore(state => state.cards[cardId].layers.filter(v => v.id === layerId)[0]);
  const setPosition = useCardsStore(state => state.setPosition);

  const [curPosition, setCurPosition] = useState(layer.position); //현재 위치를 스토어에 업로드 하지 않고 관리하기위한 state

  //drag State
  const [isDrag, setIsDrag] = useState(false);
  const [dragOffset, setDragOffset] = useState<Offset>({
    ...INITIAL_DRAG_OFFSET,
  });

  //resize State
  const [resizeState, setResizeState] = useState<Direction>('none');
  const [resizeOffset, setResizeOffset] = useState<ResizeOffset>({
    ...INITIAL_RESIZE_OFFSET,
  });

  //rotate State
  const [isRotate, setIsRotate] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  //클릭해도 Focus 상태가 풀리지 않게하기위한 이벤트 전파 방지
  const stopPropagation = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };
  const [clickedCount, setClickedCount] = useState(1);

  const clickFocusBoxHandler = (e: React.PointerEvent | React.MouseEvent) => {
    setClickedCount(prev => prev + 1);
    e.stopPropagation();
  };

  /**
   * 내부 컴포넌트(TextBox)의 크기가 변경되면 확인해서 FocusBox의 크기 업데이트됨
   */
  useEffect(() => {
    setCurPosition(layer.position);
  }, [layer.position]);

  //              //
  /* 드래그 관련 로직 */
  //              //
  const pointerDownDragHandler = (e: React.PointerEvent) => {
    setIsDrag(true);

    setDragOffset(prev => {
      return {
        ...prev,
        y: e.clientY - layer.position.y,
        x: e.clientX - layer.position.x,
      };
    });
  };

  const pointerMoveDragHandler = (e: PointerEvent) => {
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
    setPosition(cardId, layerId, { ...curPosition, y: diffY, x: diffX });
  };

  /**
   * 드래그 이벤트 등록
   */
  useEffect(() => {
    if (!isDrag) return;
    if (clickedCount > 1 && type === 'text') return;

    window.addEventListener('pointermove', pointerMoveDragHandler);
    window.addEventListener('pointerup', pointerUpDragHandler);

    return () => {
      window.removeEventListener('pointermove', pointerMoveDragHandler);
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
  const resizePointerDownHandler = (e: React.PointerEvent, direction: Direction) => {
    e.stopPropagation();

    setResizeState(direction);

    // 요소 중앙 좌표 계산
    const startCenterX = curPosition.x + curPosition.width / 2;
    const startCenterY = curPosition.y + curPosition.height / 2;

    setResizeOffset(prev => {
      return {
        ...prev,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startWidth: curPosition.width,
        startHeight: curPosition.height,
        startCenterX,
        startCenterY,
      };
    });
  };

  //                     //
  /* resize 좌표 계산 함수들 */
  //                     //

  /**
   * 절대 좌표계 -> 상대 좌표계로 변경해주는 func
   * rotate,resize가 공존할때 사용
   */
  const rotatePoint = (x: number, y: number, centerX: number, centerY: number, angle: number) => {
    const radians = (angle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = cos * (x - centerX) + sin * (y - centerY) + centerX;
    const ny = cos * (y - centerY) - sin * (x - centerX) + centerY;
    return { x: nx, y: ny };
  };

  /**
   * 절대좌표계를 상대좌표계로 바꾸고 수치를 가져올 수 있음
   */
  const getDiffInRelative = (x: number, y: number, startX: number, startY: number) => {
    const { startCenterX, startCenterY } = resizeOffset;
    const relativeCoord = rotatePoint(x, y, startCenterX, startCenterY, curPosition.rotate);

    const relativeStartCoord = rotatePoint(startX, startY, startCenterX, startCenterY, curPosition.rotate);

    return {
      diffX: relativeCoord.x - relativeStartCoord.x,
      diffY: relativeCoord.y - relativeStartCoord.y,
    };
  };

  /**
   *각 방향 별 다음 width,height를 계산
   * @param diffX 상대좌표 x증가량
   * @param diffY 상대좌표 y증가량
   * @returns Positon
   */
  const calculateN = (diffX: number, diffY: number) => {
    const height = resizeOffset.startHeight - diffY;
    return { ...curPosition, height };
  };

  const calculateS = (diffX: number, diffY: number) => {
    const height = resizeOffset.startHeight + diffY;
    return { ...curPosition, height };
  };

  const calculateE = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;
    return { ...curPosition, width };
  };

  const calculateW = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    return { ...curPosition, width };
  };

  const calculateNE = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;
    const height = resizeOffset.startHeight - diffY;
    return { ...curPosition, width, height };
  };

  const calculateNW = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    const height = resizeOffset.startHeight - diffY;
    return { ...curPosition, width, height };
  };

  const calculateSE = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    const height = resizeOffset.startHeight + diffY;
    return { ...curPosition, width, height };
  };

  const calculateSW = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;
    const height = resizeOffset.startHeight + diffY;
    return { ...curPosition, width, height };
  };

  // resize PointerMove 공통 로직
  const resizePointerMoveWrap = (e: PointerEvent, calculateFn: (diffX: number, diffY: number) => Position) => {
    // 공통 로직
    e.stopPropagation();
    if (resizeState === 'none') return;
    const { startClientX, startClientY, startCenterX, startCenterY } = resizeOffset;

    //상대좌표계에서의 diff를 계산
    const { diffX, diffY } = getDiffInRelative(e.clientX, e.clientY, startClientX, startClientY);

    //resize할 box의 width, height를 계산
    const { width, height } = calculateFn(diffX, diffY);

    //절대좌표계에서의 diff를 계산
    const absoluteDiffX = e.clientX - startClientX;
    const absoluteDiffY = e.clientY - startClientY;

    const curCenterX = startCenterX + absoluteDiffX / 2;
    const curCenterY = startCenterY + absoluteDiffY / 2;

    //최종 x,y 계산
    const x = curCenterX - width / 2;
    const y = curCenterY - height / 2;

    //@NOTE: 박스크기는 변경하지만 이동중에 cardStore를 변경하진 않음
    setCurPosition(prev => {
      return { ...prev, width, height, x, y };
    });
  };

  /* resize PointerMove Handler 정의 */
  const resizeHandler = (e: PointerEvent) => {
    let func = calculateN;
    if (resizeState === 's') func = calculateS;
    else if (resizeState === 'e') func = calculateE;
    else if (resizeState === 'w') func = calculateW;
    else if (resizeState === 'ne') func = calculateNE;
    else if (resizeState === 'nw') func = calculateNW;
    else if (resizeState === 'se') func = calculateSE;
    else if (resizeState === 'sw') func = calculateSW;

    return resizePointerMoveWrap(e, func);
  };

  /**
   * resize PointerUp 공통 로직 (resizeMouseMoveHandler와 유사함)
   * 차이점은 pointerUp은 마지막에 Store도 업데이트 시킴
   * @param e
   * @param calculateFn
   */
  const resizePointerUpHandlerWrap = (e: PointerEvent, calculateFn: (diffX: number, diffY: number) => Position) => {
    e.stopPropagation();

    const { diffX, diffY } = getDiffInRelative(
      e.clientX,
      e.clientY,
      resizeOffset.startClientX,
      resizeOffset.startClientY,
    );
    const { width, height } = calculateFn(diffX, diffY);

    const { startClientX, startClientY, startCenterX, startCenterY } = resizeOffset;

    //절대좌표계에서의 diff를 계산
    const absoluteDiffX = e.clientX - startClientX;
    const absoluteDiffY = e.clientY - startClientY;

    const curCenterX = startCenterX + absoluteDiffX / 2;
    const curCenterY = startCenterY + absoluteDiffY / 2;

    //최종 x,y 계산
    const x = curCenterX - width / 2;
    const y = curCenterY - height / 2;

    setResizeOffset({ ...INITIAL_RESIZE_OFFSET });
    setResizeState('none');
    setPosition(cardId, layerId, { ...curPosition, width, height, x, y });
  };

  /* resize PointerUp 이벤트 정의 */
  const resizePointerUpHandler = (e: PointerEvent) => {
    let func = calculateN;
    if (resizeState === 's') func = calculateS;
    else if (resizeState === 'e') func = calculateE;
    else if (resizeState === 'w') func = calculateW;
    else if (resizeState === 'ne') func = calculateNE;
    else if (resizeState === 'nw') func = calculateNW;
    else if (resizeState === 'se') func = calculateSE;
    else if (resizeState === 'sw') func = calculateSW;

    return resizePointerUpHandlerWrap(e, func);
  };

  //resize 이벤트 등록
  //@NOTE : 캡처링 단계에서 실행되는 이벤트
  useEffect(() => {
    if (resizeState === 'none') return;
    window.addEventListener('pointermove', resizeHandler, true);
    window.addEventListener('pointerup', resizePointerUpHandler, true);

    return () => {
      window.removeEventListener('pointermove', resizeHandler, true);
      window.removeEventListener('pointerup', resizePointerUpHandler, true);
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
    setPosition(cardId, layerId, { ...curPosition, rotate: rotationDegrees });
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

  // 현재 포커스된 요소가 입력 필드인지 확인하는 함수
  const isInputFocused = () => {
    const activeElement = document.activeElement;
    const isEditable = activeElement && activeElement.getAttribute('contenteditable') === 'true';

    return activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement || isEditable;
  };

  /**
   * 선택한 Layer를 delete / backspace로 삭제하는 기능
   */
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const deleteLayer = useCardsStore(state => state.deleteLayer);

  const deleteLayerHandler = (e: KeyboardEvent) => {
    if (focusedCardId !== cardId) return;

    if (isInputFocused()) return;

    if (focusedLayerId !== -1 && (e.key === 'Backspace' || e.key === 'Delete')) {
      deleteLayer(cardId, focusedLayerId);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', deleteLayerHandler);

    return () => document.removeEventListener('keydown', deleteLayerHandler);
  }, [focusedLayerId]);

  return (
    <div
      className={`absolute border ${isDrag ? 'cursor-grabbing' : 'cursor-grab'} ${clickedCount > 1 && type === 'text' && 'border-[1.5px] border-main'}`}
      style={{
        left: curPosition.x,
        top: curPosition.y,
        width: curPosition.width,
        height: curPosition.height,
        zIndex: 10000, //NOTE: focus되면 z-index가 상위로 와야함 (수치는 회의해야함!)
        transform: `rotate(${curPosition.rotate}deg)`,
        transformOrigin: 'center',
        wordWrap: 'break-word',
      }}
      onPointerDown={pointerDownDragHandler}
      onClick={clickFocusBoxHandler}
      ref={boxRef}
    >
      {/* 11시,1시,5시,7시 크기조절 바 */}
      <div
        className="absolute -left-4 -top-4 h-2 w-2 cursor-nwse-resize rounded-full border bg-gray6"
        onPointerDown={e => resizePointerDownHandler(e, 'nw')}
      ></div>
      <div
        className="absolute -right-4 -top-4 h-2 w-2 cursor-nesw-resize rounded-full border bg-gray6"
        onPointerDown={e => resizePointerDownHandler(e, 'ne')}
      ></div>
      <div
        className="absolute -bottom-4 -left-4 h-2 w-2 cursor-nesw-resize rounded-full border bg-gray6"
        onPointerDown={e => resizePointerDownHandler(e, 'se')}
      ></div>
      <div
        className="absolute -bottom-4 -right-4 h-2 w-2 cursor-nwse-resize rounded-full border bg-gray6"
        onPointerDown={e => resizePointerDownHandler(e, 'sw')}
      ></div>
      {/* 크기조절 바탕선 */}
      <div
        className="absolute -left-3 -top-3 -z-10 border"
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
        className="absolute -top-4 left-2/4 h-2 w-6 -translate-x-1/2 cursor-row-resize rounded-sm border bg-gray6"
        onPointerDown={e => resizePointerDownHandler(e, 'n')}
      ></div>
      <div
        className="absolute -right-4 top-1/2 h-6 w-2 -translate-y-1/2 cursor-col-resize rounded-sm border bg-gray6"
        onPointerDown={e => resizePointerDownHandler(e, 'e')}
      ></div>
      <div
        className="absolute -bottom-4 left-2/4 h-2 w-6 -translate-x-1/2 cursor-row-resize rounded-sm border bg-gray6"
        onPointerDown={e => resizePointerDownHandler(e, 's')}
      ></div>
      <div
        className="absolute -left-4 top-1/2 h-6 w-2 -translate-y-1/2 cursor-col-resize rounded-sm border bg-gray6"
        onPointerDown={e => resizePointerDownHandler(e, 'w')}
      ></div>
      {/* rotate button */}
      <div
        className="absolute -top-10 left-2/4 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-gray6"
        onPointerDown={pointerDownRotateHandler}
      >
        <FaArrowRotateLeft size={8} />
      </div>
      <div className="absolute h-full w-full" style={{ opacity: curPosition.opacity / 100 }}>
        {layer.type === 'text' && React.isValidElement(children)
          ? React.cloneElement(children, { clickedCount })
          : children}
      </div>
    </div>
  );
};

export default FocusBox;
