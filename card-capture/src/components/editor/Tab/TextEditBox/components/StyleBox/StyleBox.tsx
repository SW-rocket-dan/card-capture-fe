import AlignButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/AlignButton';
import SpacingButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/SpacingButton';
import ListButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/ListButton';
import ColorButton from '@/components/editor/Tab/components/ColorButton';
import { useColor } from 'react-color-palette';
import useTextFormatting from '@/components/editor/Tab/TextEditBox/hooks/useTextFormatting';
import { useEffect } from 'react';

const StyleBox = () => {
  const [color, setColor] = useColor('#000000');
  const { changeStyleHandler } = useTextFormatting();

  useEffect(() => {
    changeStyleHandler('color', color.hex);
  }, [color]);

  return (
    <div className="flex flex-row items-center gap-[20px] px-[15px] py-[10px]">
      <AlignButton />
      <SpacingButton />
      <ListButton />
      <ColorButton color={color} setColor={setColor} />
    </div>
  );
};

export default StyleBox;
