import CheckIcon from '@/components/common/Icon/CheckIcon';
import * as React from 'react';

type CheckBoxProps = {
  isChecked: boolean;
  setIsChecked: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

const CheckBox = ({ isChecked, setIsChecked }: CheckBoxProps) => {
  return (
    <div
      className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[4px] border-[1.5px] ${isChecked ? 'border-main' : 'border-border'}`}
      onClick={() => setIsChecked(prev => !prev)}
    >
      <CheckIcon width={15} className={`stroke-[1px] ${isChecked ? 'text-main' : 'text-border'}`} />
    </div>
  );
};

export default CheckBox;
