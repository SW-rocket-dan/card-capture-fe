import { useState } from 'react';
import SpacingIcon from '@/components/common/Icon/SpacingIcon';
import { Slider } from '@/components/ui/slider';

const SpacingButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [letterSpacing, setLetterSpacing] = useState<number>(5);
  const [lineHeight, setLineHeight] = useState<number>(20);
  const [fontStretch, setFontStretch] = useState<number>(100);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  const handleChangeLetterSpacing = (value: number[]) => {
    setLetterSpacing(value[0]);
  };

  const handleChangeLineHeight = (value: number[]) => {
    setLineHeight(value[0]);
  };

  const handleChangeFontStretch = (value: number[]) => {
    setFontStretch(value[0]);
  };

  return (
    <div className="relative">
      <button
        onClick={openHandler}
        className="flex h-[37px] w-[37px] items-center justify-center rounded-md hover:bg-itembg"
      >
        <SpacingIcon height={22} />
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-[10px] flex w-[300px] flex-col gap-9 rounded-lg bg-white px-[20px] py-[25px]"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <p className="text-base">자간</p>
              <input
                type="number"
                className="h-[30px] w-[60px] rounded-md bg-itembg p-2 text-sm font-bold outline-none"
                value={letterSpacing}
              />
            </div>
            <Slider value={[letterSpacing]} onValueChange={handleChangeLetterSpacing} min={0} max={10} step={1} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <p className="text-base">행간</p>
              <input
                type="number"
                className="h-[30px] w-[60px] rounded-md bg-itembg p-2 text-sm font-bold outline-none"
                value={lineHeight}
              />
            </div>
            <Slider value={[lineHeight]} onValueChange={handleChangeLineHeight} min={10} max={30} step={5} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <p className="text-base">장평</p>
              <input
                type="number"
                className="h-[30px] w-[60px] rounded-md bg-itembg p-2 text-sm font-bold outline-none"
                value={fontStretch}
              />
            </div>
            <Slider value={[fontStretch]} onValueChange={handleChangeFontStretch} min={50} max={150} step={25} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpacingButton;
