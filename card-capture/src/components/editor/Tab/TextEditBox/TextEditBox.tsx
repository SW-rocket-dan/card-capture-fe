import FontSelectBox from '@/components/editor/Tab/TextEditBox/components/FontSelectBox';
import {
  availableFontFamily,
  availableFontSize,
} from '@/components/text/TextFormat';
import SizeSelectBox from '@/components/editor/Tab/TextEditBox/components/SizeSelectBox';

const TextEditBox = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex px-[20px] py-[19px] text-[17px] font-extrabold">
        텍스트
      </div>
      <div className="flex flex-col gap-[12px] px-[15px]">
        <FontSelectBox list={availableFontFamily} />
        <div>
          <SizeSelectBox sizeList={availableFontSize} />
        </div>
      </div>
    </div>
  );
};

export default TextEditBox;
