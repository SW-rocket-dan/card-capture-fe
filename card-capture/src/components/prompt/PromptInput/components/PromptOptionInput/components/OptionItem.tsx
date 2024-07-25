import React from 'react';

type OptionItemProps = {
  title: string;
  content: string;
  isUsed?: boolean;
  onClickOption?: () => void;
};

const OptionItem = ({ title, content, isUsed = false, onClickOption }: OptionItemProps) => {
  return (
    <button
      onClick={onClickOption}
      className={`flex h-[80px] w-full flex-col items-center justify-center gap-1 rounded-[10px] sm:w-[160px] ${isUsed ? 'border-2 border-main' : 'border border-border'}`}
    >
      <p className={`text-[15px] font-semibold ${isUsed ? 'text-main' : 'text-defaultBlack'}`}>{title}</p>
      <p className={`text-[12px] ${isUsed ? 'text-main' : 'text-gray5'} `}>
        {content.slice(0, 12)}
        {content.length > 12 && '...'}
      </p>
    </button>
  );
};

export default OptionItem;
