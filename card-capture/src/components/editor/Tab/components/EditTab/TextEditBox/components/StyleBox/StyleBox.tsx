import AlignButton from '@/components/editor/Tab/components/EditTab/TextEditBox/components/StyleBox/components/AlignButton';
import SpacingButton from '@/components/editor/Tab/components/EditTab/TextEditBox/components/StyleBox/components/SpacingButton';
import ListButton from '@/components/editor/Tab/components/EditTab/TextEditBox/components/StyleBox/components/ListButton';
import ColorButton from '@/components/editor/Tab/components/EditTab/common/ColorButton';
import { IColor, useColor } from 'react-color-palette';
import useTextFormatting from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextFormatting';
import { useEffect, useState } from 'react';

const StyleBox = () => {
  const [color, setColor] = useColor('#000000');
  const [isColorSelected, setIsColorSelected] = useState(false);
  const { changeStyleHandler } = useTextFormatting();

  const handleColorChange = (newColor: IColor) => {
    setColor(newColor);
    setIsColorSelected(true);
  };

  useEffect(() => {
    if (isColorSelected) {
      changeStyleHandler('color', color.hex);
    }
  }, [color, isColorSelected]);

  return (
    <div className="flex flex-row items-center justify-between px-[25px] py-[8px]">
      <AlignButton />
      <SpacingButton />
      <ListButton />
      <ColorButton color={color} setColor={handleColorChange} direction="right" type="text" />
    </div>
  );
};

export default StyleBox;
