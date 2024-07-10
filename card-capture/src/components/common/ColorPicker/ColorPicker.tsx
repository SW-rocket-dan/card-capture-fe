import { Alpha, Hue, IColor, Saturation } from 'react-color-palette';
import 'react-color-palette/css';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type ColorPickerProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
};

/**
 * HEX 색상을 RGBA로 변환하는 유틸리티 함수
 */
export const hexToRgba = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b, a: 1 };
};

/**
 *  RGBA 색상을 HSVA로 변환하는 유틸리티 함수
 */
const rgbaToHsva = ({ r, g, b, a }: { r: number; g: number; b: number; a: number }) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: l * 100, a };
};

const ColorPicker = ({ color, setColor }: ColorPickerProps) => {
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
              className="bg-transparent font-bold outline-none"
              value={color.hex.slice(1, 7)}
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
