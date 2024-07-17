import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';
import { Position } from '@/store/useCardsStore/type';

const useLayerStyles = () => {
  const cardId = useFocusStore(state => state.focusedCardId);
  const layerId = useFocusStore(state => state.focusedLayerId);

  const prevPosition = useCardsStore(state => state.getPosition(cardId, layerId));
  const setPosition = useCardsStore(state => state.setPosition);

  /**
   * 현재 선택된 카드, 레이어의 변경된 위치 값을 스토어에 저장하는 hook
   * focused된 값을 반복적으로 가져와야 해서 hook으로 분리함
   */
  const changePositionHandler = (newPosition: Partial<Position>) => {
    const position = { ...prevPosition, ...newPosition } as Position;

    setPosition(cardId, layerId, position);
  };

  return { position: prevPosition, changePositionHandler };
};

export default useLayerStyles;
