import { GraySlider } from '@/components/ui/graySlider';
import { Dispatch, SetStateAction } from 'react';

type OpacityButtonProps = {
  opacity: number;
  setOpacity: Dispatch<SetStateAction<number>>;
};

const OpacityButton = ({ opacity, setOpacity }: OpacityButtonProps) => {
  const changeOpacityHandler = (value: number[]) => {
    setOpacity(value[0]);
  };

  return (
    <div className="flex flex-col gap-3 rounded-[10px] border-[1px] border-border px-[13px] py-[15px]">
      <div className="flex flex-row items-center justify-between">
        <p className="text-base text-gray4">투명도</p>
        <div className="flex w-[80px] flex-row justify-between rounded-md bg-itembg px-3 py-[7px] text-sm">
          <input type="number" value={opacity} min={0} max={100} className="bg-transparent font-bold outline-none" />
          <span>%</span>
        </div>
      </div>
      <GraySlider value={[opacity]} onValueChange={changeOpacityHandler} />
    </div>
  );
};

export default OpacityButton;
