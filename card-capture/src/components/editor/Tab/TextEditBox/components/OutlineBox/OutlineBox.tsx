import { ChangeEvent, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import ColorButton from '@/components/editor/Tab/components/ColorButton';
import { GraySlider } from '@/components/ui/graySlider';

const OutlineBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [outlineSize, setOutlineSize] = useState<number>(1);

  const clickCheckBoxHandler = () => {
    setIsChecked(prev => !prev);
  };

  /**
   * 외곽선의 사이즈를 변경하는 핸들러
   * 입력받은 외곽선의 사이즈를 숫자로 변환해서 범위 내인지 확인한 후에 업데이트
   */
  const changeInputSizeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (value < 0) setOutlineSize(0);
    else if (value > 10) setOutlineSize(10);
    else setOutlineSize(value);
  };

  const changeSliderSizeHandler = (value: number[]) => {
    setOutlineSize(value[0]);
  };

  return (
    <div
      className={`flex flex-col gap-3 rounded-[10px] border-[1px] border-border px-[13px] py-[15px] ${!isChecked && 'bg-light-gray'}`}
    >
      <div className={`flex flex-row items-center justify-between`}>
        <div className="flex flex-row items-center gap-[10px]">
          <label htmlFor="outline" className="text-gray4 text-base">
            외곽선
          </label>
          <Checkbox id="outline" checked={isChecked} onClick={clickCheckBoxHandler} />
        </div>

        <div className={`flex flex-row items-center gap-[10px] ${!isChecked && 'invisible'}`}>
          <ColorButton className="h-[20px] w-[35px]" hover={false} disabled={!isChecked} />
          <div className="flex flex-row items-center gap-3">
            <p className="text-gray5 text-sm">크기</p>
            <input
              disabled={!isChecked}
              type="number"
              value={outlineSize}
              onChange={changeInputSizeHandler}
              max={10}
              className="text-defaultBlack h-[24px] w-[30px] rounded-md bg-itembg p-1 text-center text-sm outline-none"
            />
          </div>
        </div>
      </div>
      {isChecked && (
        <GraySlider value={[outlineSize]} onValueChange={changeSliderSizeHandler} min={0} max={10} step={1} />
      )}
    </div>
  );
};

export default OutlineBox;
