import React, { useEffect, useState } from 'react';
import { Offset } from '@/components/editor/EditingArea/components/FocusBox/FocusBox.type';
import { INITIAL_DRAG_OFFSET } from '@/components/editor/EditingArea/components/FocusBox/FocusBox.constant';
import { LayerType, Position } from '@/store/useCardsStore/type';
import { useCardsStore } from '@/store/useCardsStore';

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

  //drag State
  const [isDrag, setIsDrag] = useState(false);
  const [dragOffset, setDragOffset] = useState<Offset>({
    ...INITIAL_DRAG_OFFSET,
  });

  /**
   * layer -> focus로 변경될 때 mouseDown 이벤트 전달해서 바로 드래그 되도록 하는 로직
   */

  useEffect(() => {
    // initialMouseDown이 있으면 즉시 드래그 시작
    if (initialMouseDown) {
      const startDrag = (e: React.MouseEvent) => {
        setIsDrag(true);
        setDragOffset({
          x: e.clientX - curPosition.x,
          y: e.clientY - curPosition.y,
        });
      };
      startDrag(initialMouseDown);
    }
  }, [initialMouseDown]);

  const pointerDownDragHandler = (e: React.PointerEvent) => {
    e.stopPropagation();
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
    setPosition(cardId, layerId, { ...curPosition, y: diffY - 0.4, x: diffX - 0.4 });
  };

  /**
   * 드래그 이벤트 등록
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
