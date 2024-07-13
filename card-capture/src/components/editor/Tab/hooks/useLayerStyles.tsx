import { useFocusStore } from '@/store/useFocusStore';
import { INITIAL_POSITION, useCardsStore } from '@/store/useCardsStore';
import { Position } from '@/store/useCardsStore/type';

const useLayerStyles = () => {
  const cardId = useFocusStore(state => state.focusedCardId);
  const layerId = useFocusStore(state => state.focusedLayerId);

  const prevPosition = useCardsStore(state => state.getPosition(cardId, layerId));
  const setPosition = useCardsStore(state => state.setPosition);

  const changePositionHandler = (newPosition: Partial<Position>) => {
    const position = { ...prevPosition, ...newPosition } as Position;

    setPosition(cardId, layerId, position);
  };

  return { position: prevPosition, changePositionHandler };
};

export default useLayerStyles;
