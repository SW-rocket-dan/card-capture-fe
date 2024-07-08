import PlusIcon from '@/components/common/Icon/PlusIcon';
import CopyIcon from '@/components/common/Icon/CopyIcon';
import UpArrowIcon from '@/components/common/Icon/UpArrowIcon';
import DownArrowIcon from '@/components/common/Icon/DownArrowIcon';
import TrashIcon from '@/components/common/Icon/TrashIcon';

const CardAddBox = () => {
  return (
    <div className="flex cursor-pointer flex-row items-center justify-center gap-[10px] rounded-[10px] bg-white p-[5px]">
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-main text-white">
        <PlusIcon width={16} className="stroke-2" />
      </div>
      <div className="flex h-[30px] w-[30px] items-center justify-center hover:text-main">
        <CopyIcon width={19} />
      </div>
      <div className="flex h-[30px] w-[30px] items-center justify-center hover:text-main">
        <UpArrowIcon width={14} />
      </div>
      <div className="flex h-[30px] w-[30px] items-center justify-center hover:text-main">
        <DownArrowIcon width={14} />
      </div>
      <div className="flex h-[30px] w-[30px] items-center justify-center hover:text-main">
        <TrashIcon width={18} />
      </div>
    </div>
  );
};

export default CardAddBox;
