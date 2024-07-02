import ColorPicker from '@/components/common/ColorPicker/ColorPicker';
import { useState } from 'react';
import { useColor } from 'react-color-palette';
import CloseIcon from '@/components/common/Icon/CloseIcon';

const ColorButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useColor('#FFB445');

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative">
      <div className="flex h-[37px] w-[37px] items-center justify-center rounded-md hover:bg-itembg">
        <button
          onClick={openHandler}
          className="h-[24px] w-[24px] rounded-md border-2 border-border"
          style={{ backgroundColor: color.hex }}
        />
      </div>

      {isOpen && (
        <div
          className="absolute mt-[10px] rounded-lg bg-white"
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
