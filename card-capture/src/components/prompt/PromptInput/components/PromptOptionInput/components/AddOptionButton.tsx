import PlusIcon from '@/components/common/Icon/PlusIcon';
import React from 'react';

type AddOptionButtonProps = {
  onClickOption?: () => void;
  children: React.ReactNode;
};

const AddOptionButton = ({ onClickOption, children }: AddOptionButtonProps) => {
  return (
    <button
      onClick={onClickOption}
      className="flex h-[80px] w-full flex-col items-center justify-center gap-1.5 rounded-[10px] border border-border sm:w-[160px]"
    >
      <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full border-[1.5px] border-main">
        <PlusIcon width={12} className="bg text-main" strokeWidth={2} />
      </div>
      <p className="text-[12px] text-gray5">{children}</p>
    </button>
  );
};

export default AddOptionButton;
