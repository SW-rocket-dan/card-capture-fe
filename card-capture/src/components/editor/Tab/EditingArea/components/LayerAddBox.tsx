import TextIcon from '@/components/common/Icon/TextIcon';
import SquareIcon from '@/components/common/Icon/SquareIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import { useCardsStore } from '@/store/useCardsStore';

const LayerAddBox = ({ cardId }: { cardId: number }) => {
  const addTextLayer = useCardsStore(state => state.addTextLayer);

  const addTextLayerHandler = () => {
    addTextLayer(cardId);
  };

  return (
    <div className="flex cursor-pointer flex-row items-center justify-center gap-[8px] rounded-[8px] bg-white px-[8px] py-[3px]">
      <div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main" onClick={addTextLayerHandler}>
        <TextIcon width={15} />
      </div>
      <div className="flex h-[25px] w-[25px] cursor-pointer flex-row items-center justify-center gap-1 hover:text-main">
        <SquareIcon width={16} />
        <DownIcon width={8} />
      </div>
    </div>
  );
};

export default LayerAddBox;
