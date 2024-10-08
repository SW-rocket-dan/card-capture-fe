import CopyIcon from '@/components/common/Icon/CopyIcon';
import PasteIcon from '@/components/common/Icon/PasteIcon';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import useDeleteLayer from '@/components/editor/EditingArea/components/FocusBox/hooks/useDeleteLayer';
import { useFocusStore } from '@/store/useFocusStore';

const InlineLayerEditBox = () => {
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const { deleteLayerOnClickHandler } = useDeleteLayer({ cardId: focusedCardId });

  return (
    <div className="flex h-[47px] w-[120px] flex-row items-center justify-between rounded-[8px] bg-white px-4 shadow-base">
      <button disabled={true}>
        <CopyIcon width={17} strokeWidth={1.5} className="text-gray3" />
      </button>
      <button disabled={true}>
        <PasteIcon width={27} className="text-gray3" />
      </button>
      <button onClick={deleteLayerOnClickHandler}>
        <TrashIcon width={17} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default InlineLayerEditBox;
