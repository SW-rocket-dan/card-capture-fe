import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import DropperIcon from '@/components/common/Icon/DropperIcon';
import { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import PromptColorPicker from '@/components/prompt/PromptInput/components/PromptColorInput/components/PromptColorPicker';
import { useColor } from 'react-color-palette';

const PromptColorInput = () => {
  const [color, setColor] = useColor('#000000');

  /**
   * 색상 선택 드롭다운 여닫는 click Handler
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative flex w-full flex-col gap-[15px]">
      <PromptCategoryText>3. 색상</PromptCategoryText>
      <div className="flex flex-row items-center gap-3">
        <PromptTitleText>색상을 선택해주세요</PromptTitleText>
        <button
          onClick={openHandler}
          className="flex h-[20px] w-[20px] items-center justify-center rounded-[5px] bg-gray2"
        >
          <DropperIcon width={11} className="text-white" />
        </button>
      </div>

      <div className="flex flex-row items-center gap-[10px]">
        <button
          onClick={openHandler}
          className="h-[30px] w-[30px] rounded-[8px] border-2 border-border"
          style={{ backgroundColor: '#FF8080' }}
        />
        <p className="text-[13px] tracking-little-tight">#FF8080</p>
      </div>

      {isOpen && <PromptColorPicker color={color} setColor={setColor} closeHandler={openHandler} />}
    </div>
  );
};

export default PromptColorInput;
