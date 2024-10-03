import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';
import React, { useEffect } from 'react';

type UseDeleteLayerProps = {
  cardId: number;
};

const useDeleteLayer = ({ cardId }: UseDeleteLayerProps) => {
  /**
   *  현재 포커스된 요소가 입력 필드인지 확인하는 함수
   *  입력 필드면 delete / backspace가 눌려도 삭제되면 안되기 떄문에 확인함
   */
  const isInputFocused = () => {
    const activeElement = document.activeElement;
    const isEditable = activeElement && activeElement.getAttribute('contenteditable') === 'true';

    return activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement || isEditable;
  };

  /**
   * 1. 선택한 Layer를 delete / backspace로 삭제하는 기능
   */
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const deleteLayer = useCardsStore(state => state.deleteLayer);

  const deleteLayerOnKeyPressHandler = (e: KeyboardEvent) => {
    if (focusedCardId !== cardId) return;

    if (isInputFocused()) return;

    if (focusedLayerId !== -1 && (e.key === 'Backspace' || e.key === 'Delete')) {
      deleteLayer(cardId, focusedLayerId);
    }
  };

  /**
   * 키보드 누르면 layer 삭제되는 이벤트 등록
   */
  useEffect(() => {
    document.addEventListener('keydown', deleteLayerOnKeyPressHandler);

    return () => document.removeEventListener('keydown', deleteLayerOnKeyPressHandler);
  }, [focusedLayerId]);

  /**
   * 2. 오른쪽 클릭으로 메뉴를 띄워서 선택한 layer를 삭제하는 기능
   */
  const deleteLayerOnClickHandler = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (focusedCardId !== cardId) return;

    deleteLayer(cardId, focusedLayerId);
  };

  return { deleteLayerOnClickHandler };
};

export default useDeleteLayer;
