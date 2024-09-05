import React, { useEffect, useState } from 'react';
import { Direction, ResizeOffset } from '@/components/editor/EditingArea/components/FocusBox/FocusBox.type';
import { INITIAL_RESIZE_OFFSET } from '@/components/editor/EditingArea/components/FocusBox/FocusBox.constant';
import { LayerType, Position } from '@/store/useCardsStore/type';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';

type UseResizeProps = {
  cardId: number;
  layerId: number;
  type?: LayerType;
  children: React.ReactElement<{
    isDoubleClicked: boolean;
  }>;
  curPosition: Position;
  setCurPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const useResize = ({ cardId, layerId, type, children, curPosition, setCurPosition }: UseResizeProps) => {
  const setPosition = useCardsStore(state => state.setPosition);

  //resize State
  const [resizeState, setResizeState] = useState<Direction>('none');
  const [resizeOffset, setResizeOffset] = useState<ResizeOffset>({
    ...INITIAL_RESIZE_OFFSET,
  });

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
   * TextBox일 때 텍스트 보다 더 작게 박스 조절되는 것을 방지하기 위한 로직
   * 내부 요소의 크기를 구한 후에 해당 크기보다 더 작게 줄이려고 하면 resize가 동작하지 않게 함
   */
  const [minSize, setMinSize] = useState({ width: 0, height: 0 });
  const editorRef = useFocusStore(state => state.currentRef);

  useEffect(() => {
    // TextBox인지 확인
    if (editorRef?.current && type === 'text') {
      const editorElement = editorRef.current?.getEditor().root;
      const { width, height } = editorElement?.getBoundingClientRect(); // textbox 감싼 div의 크기 추출

      setMinSize({ width: width + 30, height }); // 최소 크기 설정
    }
  }, [children]);

  // 사이즈 설정 시 minSize 보다 작아질 수 없게 하는 로직
  const calculateWithMinSize = (newWidth: number, newHeight: number) => {
    return {
      width: Math.max(newWidth, minSize.width),
      height: Math.max(newHeight, minSize.height),
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
    const { height: newHeight } = calculateWithMinSize(curPosition.width, height);

    return { ...curPosition, height: newHeight };
  };

  const calculateS = (diffX: number, diffY: number) => {
    const height = resizeOffset.startHeight + diffY;
    const { height: newHeight } = calculateWithMinSize(curPosition.width, height);

    return { ...curPosition, height: newHeight };
  };

  const calculateE = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;
    const { width: newWidth } = calculateWithMinSize(width, curPosition.height);

    return { ...curPosition, width: newWidth };
  };

  const calculateW = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    const { width: newWidth } = calculateWithMinSize(width, curPosition.height);

    return { ...curPosition, width: newWidth };
  };

  const calculateNE = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;
    const height = resizeOffset.startHeight - diffY;
    const { width: newWidth, height: newHeight } = calculateWithMinSize(width, height);

    return { ...curPosition, width: newWidth, height: newHeight };
  };

  const calculateNW = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    const height = resizeOffset.startHeight - diffY;
    const { width: newWidth, height: newHeight } = calculateWithMinSize(width, height);

    return { ...curPosition, width: newWidth, height: newHeight };
  };

  const calculateSE = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth - diffX;
    const height = resizeOffset.startHeight + diffY;
    const { width: newWidth, height: newHeight } = calculateWithMinSize(width, height);

    return { ...curPosition, width: newWidth, height: newHeight };
  };

  const calculateSW = (diffX: number, diffY: number) => {
    const width = resizeOffset.startWidth + diffX;
    const height = resizeOffset.startHeight + diffY;
    const { width: newWidth, height: newHeight } = calculateWithMinSize(width, height);

    return { ...curPosition, width: newWidth, height: newHeight };
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

  return { resizePointerDownHandler };
};

export default useResize;
