import PlusIcon from '@/components/common/Icon/PlusIcon';
import CopyIcon from '@/components/common/Icon/CopyIcon';
import UpArrowIcon from '@/components/common/Icon/UpArrowIcon';
import DownArrowIcon from '@/components/common/Icon/DownArrowIcon';
import TrashIcon from '@/components/common/Icon/TrashIcon';

const CardAddBox = () => {
  return (
    <div className="flex cursor-pointer flex-row items-center justify-center gap-[7px] rounded-[8px] bg-white px-[7px] py-[3px]">
      <div className="flex h-[25px] w-[25px] items-center justify-center rounded-md bg-main text-white">
        <PlusIcon width={14} className="stroke-2" />
      </div>
      <div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main">
        <CopyIcon width={17} />
      </div>
      <div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main">
        <UpArrowIcon width={12} />
      </div>
      <div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main">
        <DownArrowIcon width={12} />
      </div>
      <div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main">
        <TrashIcon width={16} />
      </div>
    </div>
  );
};

export default CardAddBox;
