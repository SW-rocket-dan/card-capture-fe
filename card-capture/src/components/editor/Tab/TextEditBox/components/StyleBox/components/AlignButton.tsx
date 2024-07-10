import { useState } from 'react';
import AlignLeftIcon from '@/components/common/Icon/AlignLeftIcon';
import AlignRightIcon from '@/components/common/Icon/AlignRightIcon';
import AlignCenterIcon from '@/components/common/Icon/AlignCenterIcon';
import AlignJustifyIcon from '@/components/common/Icon/AlignJustifyIcon';
import useTextFormatting from '@/components/editor/Tab/TextEditBox/hooks/useTextFormatting';
import useClickOutside from '@/hooks/useClickOutside';

const AlignButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alignment, setAlignment] = useState('left');
  const { changeStyleHandler } = useTextFormatting();

  const currentAlignmentIcon = (align: string) => {
    if (align === 'left') return <AlignLeftIcon height={13} className="text-defaultBlack" />;
    if (align === 'right') return <AlignRightIcon height={13} className="text-defaultBlack" />;
    if (align === 'center') return <AlignCenterIcon height={13} className="text-defaultBlack" />;
    return <AlignJustifyIcon height={15} />;
  };

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  const changeAlignmentHandler = (align: string) => {
    setAlignment(align);
    changeStyleHandler('align', align === 'left' ? '' : align);
  };

  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={openHandler}
        className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md hover:bg-itembg"
      >
        {currentAlignmentIcon(alignment)}
      </button>
      {isOpen && (
        <div
          className="absolute left-[-8px] z-10 mt-[7px] flex flex-row gap-[7px] rounded-lg bg-white p-[7px]"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <button
            onClick={() => changeAlignmentHandler('left')}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-[5px] ${alignment === 'left' ? 'bg-main' : 'hover:bg-itembg'}`}
          >
            <AlignLeftIcon height={13} className={alignment === 'left' ? 'text-white' : 'text-defaultBlack'} />
          </button>
          <button
            onClick={() => changeAlignmentHandler('center')}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-[5px] ${alignment === 'center' ? 'bg-main' : 'hover:bg-itembg'}`}
          >
            <AlignCenterIcon height={13} className={alignment === 'center' ? 'text-white' : 'text-defaultBlack'} />
          </button>
          <button
            onClick={() => changeAlignmentHandler('right')}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-[5px] ${alignment === 'right' ? 'bg-main' : 'hover:bg-itembg'}`}
          >
            <AlignRightIcon height={13} className={alignment === 'right' ? 'text-white' : 'text-defaultBlack'} />
          </button>
          <button
            onClick={() => changeAlignmentHandler('justify')}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-[5px] ${alignment === 'justify' ? 'bg-main' : 'hover:bg-itembg'}`}
          >
            <AlignJustifyIcon height={13} className={alignment === 'justify' ? 'text-white' : 'text-defaultBlack'} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlignButton;
