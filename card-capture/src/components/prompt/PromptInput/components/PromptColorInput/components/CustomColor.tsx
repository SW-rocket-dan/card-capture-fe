import { Hue, IColor, Saturation } from 'react-color-palette';
import { Dispatch, SetStateAction } from 'react';
import 'react-color-palette/css';
import '@/components/common/ColorPicker/ColorPicker.styles.css';

type CustomColorProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
};

const CustomColor = ({ color, setColor }: CustomColorProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[280px] flex-col gap-3">
        <Saturation height={280} color={color} onChange={setColor} />
        <div className="pl-1">
          <Hue color={color} onChange={setColor} />
        </div>
      </div>
    </div>
  );
};

export default CustomColor;
