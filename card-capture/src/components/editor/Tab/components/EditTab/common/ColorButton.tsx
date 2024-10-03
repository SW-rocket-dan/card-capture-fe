import ColorPicker from '@/components/common/ColorPicker/ColorPicker';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IColor } from 'react-color-palette';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useClickOutside from '@/hooks/useClickOutside';
import usePreventCloseOnSelection from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/usePreventCloseOnSelection';
import useTextStyle from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextStyle';

type ColorButtonProps = {
  color: IColor;
  setColor: (color: IColor) => void | Dispatch<SetStateAction<IColor>>;
  className?: string;
  hover?: boolean;
  disabled?: boolean;
  direction?: 'bottom' | 'left' | 'right' | 'top';
  size?: string;
  type?: 'text' | 'shape' | 'bg';
};

const ColorButton = ({
  color,
  setColor,
  className = '',
  hover = true,
  disabled = false,
  direction = 'bottom',
  size,
  type,
}: ColorButtonProps) => {
  /**
   * 색상 선택 드롭다운 여닫는 click Handler
   */
  // const { isOpen, setIsOpen, changeOpenHandler } = usePreventCloseOnSelection();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * 외부 영역 클릭시 popover 닫는 hook
   */
  const ref = useClickOutside(() => setIsOpen(false));

  /**
   * 텍스트에 적용된 색상 가져오는 hook
   */
  /**
   * 현재 적용된 스타일 가져오기
   */
  const { getStyles } = useTextStyle();

  return (
    <div ref={ref}>
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <div
            onClick={() => setIsOpen(prev => !prev)}
            className={`flex items-center justify-center rounded-md ${hover ? 'hover:bg-itembg' : ''} ${size ? `${size}` : 'h-[30px] w-[30px]'}`}
          >
            <button
              disabled={disabled}
              className={`rounded-md border-2 border-border ${className ? `${className}` : '!h-[21px] !w-[21px]'} `}
              style={{
                backgroundColor:
                  type === 'text' && typeof getStyles('color') === 'string'
                    ? (getStyles('color') as string) || color.hex
                    : color.hex,
              }}
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
          className={`absolute -top-6 left-12 rounded-lg bg-white p-0 duration-30`}
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08', zIndex: 10000 }}
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
