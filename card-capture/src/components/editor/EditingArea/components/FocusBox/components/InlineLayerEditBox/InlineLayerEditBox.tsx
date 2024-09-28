import CopyIcon from '@/components/common/Icon/CopyIcon';
import PasteIcon from '@/components/common/Icon/PasteIcon';
import TrashIcon from '@/components/common/Icon/TrashIcon';

const InlineLayerEditBox = () => {
  return (
    <div className="shadow-base flex h-[47px] w-[120px] flex-row items-center justify-between rounded-[8px] bg-white px-4">
      <CopyIcon width={17} strokeWidth={1.5} />
      <PasteIcon width={27} />
      <TrashIcon width={17} strokeWidth={1.5} />
    </div>
  );
};

export default InlineLayerEditBox;
