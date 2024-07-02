import ColorPicker from '@/components/common/ColorPicker/ColorPicker';
import { useState } from 'react';
import { useColor } from 'react-color-palette';
import CloseIcon from '@/components/common/Icon/CloseIcon';

type ColorButtonProps = {
  className?: string;
  hover?: boolean;
  disabled?: boolean;
};

const ColorButton = ({ className = '', hover = true, disabled = false }: ColorButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useColor('#000000');

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative">
      <div
        className={`flex h-[37px] w-[37px] items-center justify-center rounded-md ${hover ? 'hover:bg-itembg' : ''}`}
      >
        <button
          disabled={disabled}
          onClick={openHandler}
          className={`rounded-md border-2 border-border ${className ? `${className}` : 'h-[24px] w-[24px]'} `}
          style={{ backgroundColor: color.hex }}
        />
      </div>

      {isOpen && (
        <div
          className="absolute z-20 mt-[10px] rounded-lg bg-white"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div className="flex flex-row justify-between px-[15px] py-[10px] font-extrabold">
            <p className="text-md">색상</p>
            <button onClick={openHandler}>
              <CloseIcon width={10} className="text-gray2" />
            </button>
          </div>
          <ColorPicker color={color} setColor={setColor} />
        </div>
      )}
    </div>
  );
};

export default ColorButton;
