import { useRef, useState } from 'react';
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
    if (align === 'left') return <AlignLeftIcon height={17} className="text-defaultBlack" />;
    if (align === 'right') return <AlignRightIcon height={17} className="text-defaultBlack" />;
    if (align === 'center') return <AlignCenterIcon height={17} className="text-defaultBlack" />;
    return <AlignJustifyIcon height={17} />;
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
        className="flex h-[37px] w-[37px] cursor-pointer items-center justify-center rounded-md hover:bg-itembg"
      >
        {currentAlignmentIcon(alignment)}
      </button>
      {isOpen && (
        <div
          className="absolute left-[-10px] z-10 mt-[10px] flex flex-row gap-[10px] rounded-lg bg-white p-2.5"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <button
            onClick={() => changeAlignmentHandler('left')}
            className={`flex h-[35px] w-[35px] items-center justify-center rounded-[5px] ${alignment === 'left' ? 'bg-main' : 'hover:bg-itembg'}`}
          >
            <AlignLeftIcon height={15} className={alignment === 'left' ? 'text-white' : 'text-defaultBlack'} />
          </button>
          <button
            onClick={() => changeAlignmentHandler('center')}
            className={`flex h-[35px] w-[35px] items-center justify-center rounded-[5px] ${alignment === 'center' ? 'bg-main' : 'hover:bg-itembg'}`}
          >
            <AlignCenterIcon height={15} className={alignment === 'center' ? 'text-white' : 'text-defaultBlack'} />
          </button>
          <button
            onClick={() => changeAlignmentHandler('right')}
            className={`flex h-[35px] w-[35px] items-center justify-center rounded-[5px] ${alignment === 'right' ? 'bg-main' : 'hover:bg-itembg'}`}
          >
            <AlignRightIcon height={15} className={alignment === 'right' ? 'text-white' : 'text-defaultBlack'} />
          </button>
          <button
            onClick={() => changeAlignmentHandler('justify')}
            className={`flex h-[35px] w-[35px] items-center justify-center rounded-[5px] ${alignment === 'justify' ? 'bg-main' : 'hover:bg-itembg'}`}
          >
            <AlignJustifyIcon height={15} className={alignment === 'justify' ? 'text-white' : 'text-defaultBlack'} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlignButton;
