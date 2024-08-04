import { Alpha, Hue, IColor, Saturation } from 'react-color-palette';
import 'react-color-palette/css';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import './ColorPicker.styles.css';
import { hexToRgba, rgbaToHsva } from '@/components/common/ColorPicker/colorUtils';

type ColorPickerProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
};

const ColorPicker = ({ color, setColor }: ColorPickerProps) => {
  /**
   * react-color-palette 라이브러리에서 선택한 색상을 hex,rgb,hsv로 변환해서 상태에 저장하는 핸들러
   */
  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value.toUpperCase();

    const hexColor = `#${newColor.padEnd(6, '0')}`;
    const rgba = hexToRgba(hexColor);
    const hsva = rgbaToHsva(rgba);

    if (/^[0-9A-F]*$/.test(newColor)) {
      if (newColor.length <= 6) {
        setColor({
          ...color,
          hex: `#${newColor}`,
          rgb: rgba,
          hsv: hsva,
        });
      }
    }
  };

  return (
    <div className="flex w-full flex-col pb-4">
      <div className="flex w-[230px] flex-col gap-3">
        <Saturation height={230} color={color} onChange={setColor} />
        <div className="flex flex-col gap-2.5 px-4">
          <Hue color={color} onChange={setColor} />
          <Alpha color={color} onChange={setColor} />
          <div className="flex flex-row items-center justify-between rounded-md bg-itembg px-3 py-2 text-xs">
            <input
              className="bg-transparent font-medium outline-none"
              value={color.hex.slice(1, 7)} // 앞에 # 삭제하기 위한 슬라이싱
              maxLength={6}
              onChange={handleChangeColor}
            />
            <p className="text-[11px] font-bold text-gray2">HEX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
