import { Alpha, Hue, IColor, Saturation } from 'react-color-palette';
import 'react-color-palette/css';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import './ColorPicker.styles.css';
import { hexToRgba, rgbaToHsva } from '@/components/common/ColorPicker/colorUtils';
import { useCardsStore } from '@/store/useCardsStore';

type ColorPickerProps = {
  color: IColor;
  setColor: (color: IColor) => void | Dispatch<SetStateAction<IColor>>;
};

const ColorPicker = ({ color, setColor }: ColorPickerProps) => {
  const [newColor, setNewColor] = useState<IColor>(color);

  /**
   * react-color-palette 라이브러리에서 선택한 색상을 hex,rgb,hsv로 변환해서 상태에 저장하는 핸들러
   */
  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const changedColor = e.target.value.toUpperCase();

    const hexColor = `#${changedColor.padEnd(6, '0')}`;
    const rgba = hexToRgba(hexColor);
    const hsva = rgbaToHsva(rgba);

    if (/^[0-9A-F]*$/.test(changedColor)) {
      if (changedColor.length <= 6) {
        setColor({
          ...color,
          hex: `#${changedColor}`,
          rgb: rgba,
          hsv: hsva,
        });
      }
    }
  };

  /**
   * 마지막에 선택된 색상만 전역 상태에 저장되도록 함
   */
  const setUsedColors = useCardsStore(state => state.setUsedColors);

  const changeCompleteColorHandler = (color: IColor) => {
    setUsedColors(color.hex);
  };

  return (
    <div className="flex w-full flex-col pb-4">
      <div className="flex w-[230px] flex-col gap-3">
        <Saturation height={230} color={color} onChange={setColor} onChangeComplete={changeCompleteColorHandler} />
        <div className="flex flex-col gap-2.5 px-4">
          <Hue color={color} onChange={setColor} onChangeComplete={changeCompleteColorHandler} />
          <Alpha color={color} onChange={setColor} onChangeComplete={changeCompleteColorHandler} />
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
