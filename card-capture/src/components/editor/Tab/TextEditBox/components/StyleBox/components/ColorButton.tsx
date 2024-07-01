import ColorPicker from '@/components/common/ColorPicker/ColorPicker';
import { useState } from 'react';
import { useColor } from 'react-color-palette';

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
        <div className="absolute mt-[10px]">
          <ColorPicker color={color} setColor={setColor} onClick={openHandler} />
        </div>
      )}
    </div>
  );
};

export default ColorButton;
