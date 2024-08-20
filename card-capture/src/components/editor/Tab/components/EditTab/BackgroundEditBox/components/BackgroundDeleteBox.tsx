import TrashIcon from '@/components/common/Icon/TrashIcon';
import Button from '@/components/common/Button/Button';
import { useCardsStore } from '@/store/useCardsStore';
import { useFocusStore } from '@/store/useFocusStore';

const BackgroundDeleteBox = () => {
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const setBackground = useCardsStore(state => state.setBackground);
  const deleteBackgroundHandler = () => {
    setBackground(focusedCardId, { url: '', color: '#FFFFFF', opacity: 100 });
  };

  return (
    <Button type="full" className="gap-[6px] border-2 border-main py-[10px]" onClick={deleteBackgroundHandler}>
      <TrashIcon width={14} />
      <p className="text-xs font-medium">배경 삭제하기</p>
    </Button>
  );
};

export default BackgroundDeleteBox;
