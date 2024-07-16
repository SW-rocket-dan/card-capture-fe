import { useState } from 'react';
import SpacingIcon from '@/components/common/Icon/SpacingIcon';
import { Slider } from '@/components/ui/slider';
import useTextFormatting from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextFormatting';
import useClickOutside from '@/hooks/useClickOutside';

const SpacingButton = () => {
  /**
   * 드롭다운을 여닫는 click handler
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  // 텍스트 스타일 적용 hook
  const { changeStyleHandler } = useTextFormatting();

  /**
   * 텍스트 간격 조절 handlers
   */
  const [letterSpacing, setLetterSpacing] = useState<number>(0);

  const handleChangeLetterSpacing = (value: number[]) => {
    setLetterSpacing(value[0]);
    changeStyleHandler('letter-spacing', `${value[0]}px`);
  };

  const [lineHeight, setLineHeight] = useState<number>(15);

  const handleChangeLineHeight = (value: number[]) => {
    setLineHeight(value[0]);
    changeStyleHandler('line-height', `${value[0]}px`);
  };

  /**
   * @FIXME 장평 적용안되는 오류 있음. 추후 수정 요망
   */
  const [fontStretch, setFontStretch] = useState<number>(100);

  const handleChangeFontStretch = (value: number[]) => {
    setFontStretch(value[0]);
    changeStyleHandler('font-stretch', `${value[0]}`);
  };

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={openHandler}
        className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md hover:bg-itembg"
      >
        <SpacingIcon height={17} />
      </button>

      {/* 텍스트 간격 조절 모달 */}
      {isOpen && (
        <div
          className="absolute z-10 mt-[7px] flex w-[250px] flex-col gap-7 rounded-lg bg-white px-[15px] py-[17px]"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <p className="text-[12px]">자간</p>
              <input
                type="number"
                className="h-[25px] w-[60px] rounded-md bg-itembg p-2 text-xs font-bold outline-none"
                value={letterSpacing}
              />
            </div>
            <Slider value={[letterSpacing]} onValueChange={handleChangeLetterSpacing} min={0} max={10} step={1} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <p className="text-[12px]">행간</p>
              <input
                type="number"
                className="h-[25px] w-[60px] rounded-md bg-itembg p-2 text-xs font-bold outline-none"
                value={lineHeight}
              />
            </div>
            <Slider value={[lineHeight]} onValueChange={handleChangeLineHeight} min={10} max={30} step={5} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <p className="text-[12px]">장평</p>
              <input
                type="number"
                className="h-[25px] w-[60px] rounded-md bg-itembg p-2 text-xs font-bold outline-none"
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
