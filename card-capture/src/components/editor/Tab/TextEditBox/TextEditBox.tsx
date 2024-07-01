import FontSelectBox from '@/components/editor/Tab/TextEditBox/components/FontSelectBox/FontSelectBox';
import {
  availableFontFamily,
  availableFontSize,
} from '@/components/text/TextFormat';
import SizeSelectBox from '@/components/editor/Tab/TextEditBox/components/SizeSelectBox/SizeSelectBox';
import FormatBox from '@/components/editor/Tab/TextEditBox/components/FormatBox/FormatBox';
import StyleBox from '@/components/editor/Tab/TextEditBox/components/StyleBox/StyleBox';

const TextEditBox = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex px-[20px] py-[19px] text-[17px] font-extrabold">
        텍스트
      </div>

      <div className="flex flex-col gap-[12px] px-[15px]">
        <FontSelectBox list={availableFontFamily} />
        <div className="flex flex-row">
          <SizeSelectBox sizeList={availableFontSize} />
          <FormatBox />
        </div>
        <StyleBox />
      </div>
    </div>
  );
};

export default TextEditBox;
