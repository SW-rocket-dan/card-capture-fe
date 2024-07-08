import { GraySlider } from '@/components/ui/graySlider';

const OpacityButton = () => {
  return (
    <div className="flex flex-col gap-3 rounded-[10px] border-[1px] border-border px-[13px] py-[15px]">
      <div className="flex flex-row items-center justify-between">
        <p className="text-base text-gray4">투명도</p>
        <div className="flex w-[80px] flex-row justify-between rounded-md bg-itembg px-3 py-[7px] text-sm">
          <input type="number" min={0} max={100} className="bg-transparent font-bold outline-none" />
          <span>%</span>
        </div>
      </div>
      <GraySlider />
    </div>
  );
};

export default OpacityButton;
