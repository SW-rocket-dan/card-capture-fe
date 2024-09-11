import CheckBox from '@/components/common/CheckBox/CheckBox';
import Poster from '@/components/common/Poster/Poster';
import { Card } from '@/store/useCardsStore/type';

type SelectedPosterProps = {
  size: number;
  card: Card;
  isChecked: boolean;
  setIsChecked: () => void;
};

const SelectedPoster = ({ size, card, isChecked, setIsChecked }: SelectedPosterProps) => {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex flex-row items-center gap-[13px]">
        <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
        <div
          className="rounded-[3px] px-[8px] py-[1px]"
          style={{ background: 'linear-gradient(90deg, #6F6CFF 0%, rgba(255, 126, 85, 0.88) 100%)' }}
        >
          <span className="text-[13px] font-semibold text-white">Premium</span>
        </div>
      </div>
      <button onClick={setIsChecked}>
        <Poster size={size} card={card} isSelected={isChecked} />
      </button>
    </div>
  );
};

export default SelectedPoster;
