import React, { useEffect, useRef, useState } from 'react';
import { Point } from '@/components/editor/EditingArea/components/FocusBox/FocusBox.type';
import { INITIAL_DRAG_OFFSET } from '@/components/editor/EditingArea/components/FocusBox/FocusBox.constant';
import { LayerType, Position } from '@/store/useCardsStore/type';
import { useCardsStore } from '@/store/useCardsStore';

const DRAG_THRESHOLD = 1;

type UseDragProps = {
  cardId: number;
  layerId: number;
  type?: LayerType;
  curPosition: Position;
  setCurPosition: React.Dispatch<React.SetStateAction<Position>>;
  initialMouseDown: React.MouseEvent | null;
  isDoubleClicked: boolean;
};

const useDrag = ({
  cardId,
  layerId,
  type,
  curPosition,
  setCurPosition,
  initialMouseDown,
  isDoubleClicked,
}: UseDragProps) => {
  const layer = useCardsStore(state => state.cards[cardId].layers.filter(v => v.id === layerId)[0]);
  const setPosition = useCardsStore(state => state.setPosition);

  const [isDrag, setIsDrag] = useState(false);
  const [dragOffset, setDragOffset] = useState<Point>({
    ...INITIAL_DRAG_OFFSET,
  });
  const initialPositionRef = useRef<Point | null>(null);

  /**
   * 요소를 잡았을 때 초기 위치에서(layer.position) 마우스 위치(clientX, clientY)까지 어느정도의 offset이 있는지 계산하는 로직
   * 좌표는 왼쪽 위 기준으로 되어있는데 마우스는 해당 위치에서 떨어진 곳을 잡기 때문에 그 이동 위치만큼 뺴줘야지 정확한 새 좌표 계산 가능
   */
  const calculateDragOffset = (e: React.PointerEvent | React.MouseEvent): Point => {
    return {
      x: e.clientX - layer.position.x,
      y: e.clientY - layer.position.y,
    };
  };

  /**
   * 현재 마우스 위치에서 offset을 빼서 요소 렌더링 기준이 되는 왼쪽 위 좌표 계산
   */
  const calculateCurPosition = (e: PointerEvent | MouseEvent) => {
    return {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    };
  };

  /**
   * Layer pointerDown시 실행되는 로직
   * 이벤트 등록을 위해 상태 true로 변경. 초기값 기억해서 임계값 이하 이동은 무시
   */
  const pointerDownDragHandler = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();

    setIsDrag(true);
    setDragOffset(calculateDragOffset(e));
    initialPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  /**
   * LayerBox -> FocusBox로 변경될 때 mouseDown 이벤트 전달해서 바로 드래그 되도록 하는 로직
   * initialMouseDown : LayerBox mouseDown시 발생하는 이벤트
   */
  useEffect(() => {
    if (initialMouseDown) {
      pointerDownDragHandler(initialMouseDown);
    }
  }, [initialMouseDown]);

  /**
   * 드래그 중 pointerMove 시 실행되는 로직
   * 이동한 거리를 계산해서 curPosition에 업데이트 해서 변경된 위치로 렌더링 될 수 있도록 함
   */
  const pointerMoveDragHandler = (e: PointerEvent | MouseEvent) => {
    if (!isDrag) return;

    setCurPosition(prev => ({
      ...prev,
      ...calculateCurPosition(e),
    }));
  };

  /**
   * 드래그가 끝났을 때 실행되는 로직
   * 마지막 위치를 전역 상태에 저장하고, 기록된 상태를 초기화
   * 임계값 처리를 해주지 않으면 layer -> focus 컴포넌트 변경시에 발생하는 미세한 이동이 적용되어서 불편함 존재
   */
  const pointerUpDragHandler = (e: PointerEvent | MouseEvent) => {
    if (!initialPositionRef.current) return;

    setDragOffset({ ...INITIAL_DRAG_OFFSET });
    setIsDrag(false);

    // 위치 어느정도 변경되었는지 확인
    const dx = e.clientX - initialPositionRef.current.x;
    const dy = e.clientY - initialPositionRef.current.y;

    // 둘 다 임계값 이하로 움직였으면 이동에 반영하지 않음
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      setPosition(cardId, layerId, { ...curPosition, ...calculateCurPosition(e) });
    }
  };

  /**
   * 드래그 이벤트 등록
   * 텍스트 편집 중 드래그가 발생할 수 있기 때문에 편집 모드일 때는 드래그 이벤트 적용 X
   */
  useEffect(() => {
    if (!isDrag) return;
    if (isDoubleClicked && type === 'text') return;

    window.addEventListener('pointermove', pointerMoveDragHandler);
    window.addEventListener('pointerup', pointerUpDragHandler);

    return () => {
      window.removeEventListener('pointermove', pointerMoveDragHandler);
      window.removeEventListener('pointerup', pointerUpDragHandler);
    };
  }, [isDrag]);

  return { isDrag, pointerDownDragHandler };
};

export default useDrag;
