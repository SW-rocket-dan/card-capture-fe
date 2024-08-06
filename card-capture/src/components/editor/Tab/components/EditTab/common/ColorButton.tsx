import ColorPicker from '@/components/common/ColorPicker/ColorPicker';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IColor } from 'react-color-palette';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFocusStore } from '@/store/useFocusStore';
import useClickOutside from '@/hooks/useClickOutside';
import usePreventCloseOnSelection from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/usePreventCloseOnSelection';

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
  const { isOpen, setIsOpen, changeOpenHandler } = usePreventCloseOnSelection();

  /**
   * 외부 영역 클릭시 popover 닫는 hook
   */
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref}>
      <Popover open={isOpen} onOpenChange={changeOpenHandler}>
        <PopoverTrigger asChild>
          <div
            className={`flex items-center justify-center rounded-md ${hover ? 'hover:bg-itembg' : ''} ${size ? `${size}` : 'h-[30px] w-[30px]'}`}
          >
            <button
              disabled={disabled}
              className={`rounded-md border-2 border-border ${className ? `${className}` : '!h-[21px] !w-[21px]'} `}
              style={{ backgroundColor: color.hex }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          onMouseDown={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onMouseUp={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          side={direction}
          className={`duration-[30ms] absolute -top-6 left-12 z-20 rounded-lg bg-white p-0`}
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div>
            <div className="flex flex-row justify-between px-[15px] py-[10px] font-semibold">
              <p className="text-xs">색상</p>
              <button onClick={() => setIsOpen(false)}>
                <CloseIcon width={8} className="text-gray2" />
              </button>
            </div>
            <ColorPicker color={color} setColor={setColor} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorButton;
