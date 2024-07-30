import PlusIcon from '@/components/common/Icon/PlusIcon';
import CopyIcon from '@/components/common/Icon/CopyIcon';
import UpArrowIcon from '@/components/common/Icon/UpArrowIcon';
import DownArrowIcon from '@/components/common/Icon/DownArrowIcon';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import { INITIAL_CARD, useCardsStore } from '@/store/useCardsStore';

const CardAddBox = () => {
  const setCard = useCardsStore(state => state.setCard);
  const deleteCardHandler = () => {
    if (window.confirm('카드가 전부 초기화됩니다. 정말 삭제하시겠습니까?')) {
      setCard([INITIAL_CARD]);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-[7px] rounded-[8px] bg-white px-[6px] py-[3px]">
      {/*<div className="flex h-[25px] w-[25px] items-center justify-center rounded-md bg-main text-white">*/}
      {/*  <PlusIcon width={13} className="stroke-2" />*/}
      {/*</div>*/}
      {/*<div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main">*/}
      {/*  <CopyIcon width={15} />*/}
      {/*</div>*/}
      {/*<div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main">*/}
      {/*  <UpArrowIcon width={11} />*/}
      {/*</div>*/}
      {/*<div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main">*/}
      {/*  <DownArrowIcon width={11} />*/}
      {/*</div>*/}
      <button
        onClick={deleteCardHandler}
        className="flex h-[25px] w-[25px] items-center justify-center hover:text-main"
      >
        <TrashIcon width={14} />
      </button>
    </div>
  );
};

export default CardAddBox;
