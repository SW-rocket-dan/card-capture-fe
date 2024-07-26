import { GraySlider } from '@/components/ui/graySlider';
import useLayerStyles from '@/components/editor/Tab/hooks/useLayerStyles';
import { Dispatch, SetStateAction, useEffect } from 'react';

type OpacityButtonProps = {
  opacity: number;
  setOpacity: Dispatch<SetStateAction<number>>;
};

const OpacityButton = ({ opacity, setOpacity }: OpacityButtonProps) => {
  const { position, changePositionHandler } = useLayerStyles();

  useEffect(() => {
    if (!position) return;

    setOpacity(position.opacity);
  }, [position]);

  const changeOpacityHandler = (value: number[]) => {
    setOpacity(value[0]);
    changePositionHandler({ opacity: value[0] });
  };

  return (
    <div className="flex flex-col gap-2.5 rounded-[10px] border-[1px] border-border px-[10px] py-[10px]">
      <div className="flex flex-row items-center justify-between">
        <p className="text-xs text-gray4">투명도</p>
        <div className="flex w-[80px] flex-row justify-between rounded-md bg-itembg px-3 py-[5px] text-xs">
          <input type="number" value={opacity} min={0} max={100} className="bg-transparent font-medium outline-none" />
          <span>%</span>
        </div>
      </div>
      <GraySlider value={[opacity]} onValueChange={changeOpacityHandler} />
    </div>
  );
};

export default OpacityButton;
