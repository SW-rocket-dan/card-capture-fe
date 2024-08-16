import MoveToFrontIcon from '@/components/common/Icon/MoveToFrontIcon';
import MoveToFirstIcon from '@/components/common/Icon/MoveToFirstIcon';
import MoveToBackIcon from '@/components/common/Icon/MoveToBackIcon';
import MoveToLastIcon from '@/components/common/Icon/MoveToLastIcon';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';

const OrderBox = () => {
  /**
   * 선택된 레이어 가져오는 로직
   */
  const cardId = useFocusStore(state => state.focusedCardId);
  const layerId = useFocusStore(state => state.focusedLayerId);

  /**
   * useCardStore에서 가져온 레이어 z-index 변경 로직
   */
  const moveLayerForward = useCardsStore(state => state.moveLayerForward);
  const moveLayerBackward = useCardsStore(state => state.moveLayerBackward);
  const moveLayerToFront = useCardsStore(state => state.moveLayerToFront);
  const moveLayerToBack = useCardsStore(state => state.moveLayerToBack);

  return (
    <div className="flex flex-row items-center justify-between rounded-[10px] border-[1px] border-border px-[10px] py-[10px]">
      <p className="text-xs text-gray4">순서</p>
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => moveLayerForward(cardId, layerId)}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
        >
          <MoveToFrontIcon width={17} />
        </button>
        <button
          onClick={() => moveLayerToFront(cardId, layerId)}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
        >
          <MoveToFirstIcon width={17} />
        </button>
        <button
          onClick={() => moveLayerBackward(cardId, layerId)}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
        >
          <MoveToBackIcon width={17} />
        </button>
        <button
          onClick={() => moveLayerToBack(cardId, layerId)}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
        >
          <MoveToLastIcon width={17} />
        </button>
      </div>
    </div>
  );
};

export default OrderBox;
