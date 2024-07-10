import { ChangeEvent, useState } from 'react';
import ColorButton from '@/components/editor/Tab/components/ColorButton';
import { GraySlider } from '@/components/ui/graySlider';
import CheckIcon from '@/components/common/Icon/CheckIcon';
import * as React from 'react';
import { useColor } from 'react-color-palette';

const OutlineBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [outlineSize, setOutlineSize] = useState<number>(1);

  const [color, setColor] = useColor('#000000');

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
      className={`flex flex-col gap-2 rounded-[10px] border-[1px] border-border px-[10px] py-[10px] ${!isChecked && 'bg-light-gray'}`}
    >
      <div className={`flex flex-row items-center justify-between`}>
        <div className="flex flex-row items-center gap-[10px]">
          <label htmlFor="outline" className="text-xs text-gray4">
            외곽선
          </label>
          <div
            className={`flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-sm border border-gray3 ${isChecked ? 'bg-gray2' : 'bg-white'}`}
            onClick={clickCheckBoxHandler}
          >
            {isChecked && <CheckIcon width={18} className="stroke-[1.8px] text-white" />}
          </div>
        </div>

        <div className={`flex flex-row items-center gap-[10px] ${!isChecked && 'invisible'}`}>
          <ColorButton
            color={color}
            setColor={setColor}
            className="h-[18px] !w-[30px]"
            hover={false}
            disabled={!isChecked}
          />
          <div className="flex flex-row items-center gap-3">
            <p className="text-xs text-gray5">크기</p>
            <input
              disabled={!isChecked}
              type="number"
              value={outlineSize}
              onChange={changeInputSizeHandler}
              max={10}
              className="h-[24px] w-[30px] rounded-md bg-itembg p-1 text-center text-xs text-defaultBlack outline-none"
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
