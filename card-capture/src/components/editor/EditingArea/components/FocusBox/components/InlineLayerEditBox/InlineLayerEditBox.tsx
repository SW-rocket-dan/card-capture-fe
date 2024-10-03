import CopyIcon from '@/components/common/Icon/CopyIcon';
import PasteIcon from '@/components/common/Icon/PasteIcon';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import useDeleteLayer from '@/components/editor/EditingArea/components/FocusBox/hooks/useDeleteLayer';
import { useFocusStore } from '@/store/useFocusStore';

const InlineLayerEditBox = () => {
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const { deleteLayerOnClickHandler } = useDeleteLayer({ cardId: focusedCardId });

  return (
    <div className="shadow-base flex h-[47px] w-[120px] flex-row items-center justify-between rounded-[8px] bg-white px-4">
      <button>
        <CopyIcon width={17} strokeWidth={1.5} />
      </button>
      <button>
        <PasteIcon width={27} />
      </button>
      <button onClick={deleteLayerOnClickHandler}>
        <TrashIcon width={17} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default InlineLayerEditBox;
