import TextIcon from '@/components/common/Icon/TextIcon';
import SquareIcon from '@/components/common/Icon/SquareIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import { useCardsStore } from '@/store/useCardsStore';

const LayerAddBox = () => {
  const addTextLayer = useCardsStore(state => state.addTextLayer);

  const addTextLayerHandler = () => {
    addTextLayer(0);
  };

  return (
    <div className="flex cursor-pointer flex-row items-center justify-center gap-[10px] rounded-[10px] bg-white p-[5px]">
      <div className="flex h-[30px] w-[30px] items-center justify-center hover:text-main" onClick={addTextLayerHandler}>
        <TextIcon width={18} />
      </div>
      <div className="flex h-[30px] w-[30px] cursor-pointer flex-row items-center justify-center gap-1 hover:text-main">
        <SquareIcon width={17} />
        <DownIcon width={8} />
      </div>
    </div>
  );
};

export default LayerAddBox;
