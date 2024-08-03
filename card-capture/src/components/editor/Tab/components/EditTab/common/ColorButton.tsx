import ColorPicker from '@/components/common/ColorPicker/ColorPicker';
import { Dispatch, SetStateAction, useState } from 'react';
import { IColor } from 'react-color-palette';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type ColorButtonProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
  className?: string;
  hover?: boolean;
  disabled?: boolean;
  direction?: 'bottom' | 'left' | 'right' | 'top';
  size?: string;
};

const ColorButton = ({
  color,
  setColor,
  className = '',
  hover = true,
  disabled = false,
  direction = 'bottom',
  size,
}: ColorButtonProps) => {
  /**
   * 색상 선택 드롭다운 여닫는 click Handler
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div
          className={`flex items-center justify-center rounded-md ${hover ? 'hover:bg-itembg' : ''} ${size ? `${size}` : 'h-[30px] w-[30px]'}`}
        >
          <button
            disabled={disabled}
            onClick={openHandler}
            className={`rounded-md border-2 border-border ${className ? `${className}` : '!h-[21px] !w-[21px]'} `}
            style={{ backgroundColor: color.hex }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side={direction}
        className={`duration-[30ms] absolute -top-6 left-12 z-20 rounded-lg bg-white p-0`}
        style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
      >
        <div>
          <div className="flex flex-row justify-between px-[15px] py-[10px] font-semibold">
            <p className="text-xs">색상</p>
            <button onClick={openHandler}>
              <CloseIcon width={8} className="text-gray2" />
            </button>
          </div>
          <ColorPicker color={color} setColor={setColor} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorButton;
