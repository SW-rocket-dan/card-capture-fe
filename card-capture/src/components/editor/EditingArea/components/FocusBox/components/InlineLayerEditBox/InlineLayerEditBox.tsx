import CopyIcon from '@/components/common/Icon/CopyIcon';
import PasteIcon from '@/components/common/Icon/PasteIcon';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import useDeleteLayer from '@/components/editor/EditingArea/components/FocusBox/hooks/useDeleteLayer';
import { useFocusStore } from '@/store/useFocusStore';
import { useCommandStore } from '@/store/useCommandStore';

const InlineLayerEditBox = () => {
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);

  // 삭제 기능
  const { deleteLayerOnClickHandler } = useDeleteLayer({ cardId: focusedCardId });

  // 복사, 붙여넣기 기능
  const { copy, paste } = useCommandStore();

  const copyHandler = () => {
    copy(focusedCardId, focusedLayerId);
  };

  const pasteHandler = () => {
    paste(focusedCardId);
  };

  return (
    <div className="flex h-[47px] w-[120px] flex-row items-center justify-between rounded-[8px] bg-white px-4 shadow-base">
      <button onClick={copyHandler}>
        <CopyIcon width={17} strokeWidth={1.5} />
      </button>
      <button onClick={pasteHandler}>
        <PasteIcon width={27} />
      </button>
      <button onClick={deleteLayerOnClickHandler}>
        <TrashIcon width={17} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default InlineLayerEditBox;
