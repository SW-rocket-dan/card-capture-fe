import { Alpha, Hue, IColor, Saturation, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@/components/common/Icon/CloseIcon';

type ColorPickerProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
  onClick: () => void;
};

const ColorPicker = ({ color, setColor, onClick }: ColorPickerProps) => {
  return (
    <div
      className="flex w-full flex-col rounded-lg bg-white pb-4"
      style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
    >
      <div className="flex flex-row justify-between px-[15px] py-[10px] text-sm font-extrabold">
        <p>색상</p>
        <button onClick={onClick}>
          <CloseIcon width={10} className="text-gray2" />
        </button>
      </div>

      <div className="flex w-[250px] flex-col gap-3">
        <Saturation height={250} color={color} onChange={setColor} />
        <div className="flex flex-col gap-3 px-4">
          <Hue color={color} onChange={setColor} />
          <Alpha color={color} onChange={setColor} />
          <div className="flex flex-row items-center justify-between rounded-md bg-itembg px-3 py-2 text-sm">
            <p className="font-bold">{color.hex}</p>
            <p className="text-xs font-bold text-gray2">HEX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
