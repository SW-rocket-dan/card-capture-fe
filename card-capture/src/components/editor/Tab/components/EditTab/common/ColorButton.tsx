import ColorPicker from '@/components/common/ColorPicker/ColorPicker';
import { Dispatch, SetStateAction, useState } from 'react';
import { IColor } from 'react-color-palette';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import useClickOutside from '@/hooks/useClickOutside';

type ColorButtonProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
  className?: string;
  hover?: boolean;
  disabled?: boolean;
  direction?: string;
  size?: string;
};

const ColorButton = ({
  color,
  setColor,
  className = '',
  hover = true,
  disabled = false,
  direction = 'down',
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

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
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

      {isOpen && (
        <div
          className={`absolute z-20 rounded-lg bg-white ${
            direction === 'right' ? 'left-full -mt-[50px] ml-[55px]' : 'mt-[7px]'
          }`}
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div className="flex flex-row justify-between px-[15px] py-[10px] font-extrabold">
            <p className="text-xs">색상</p>
            <button onClick={openHandler}>
              <CloseIcon width={8} className="text-gray2" />
            </button>
          </div>
          <ColorPicker color={color} setColor={setColor} />
        </div>
      )}
    </div>
  );
};

export default ColorButton;
