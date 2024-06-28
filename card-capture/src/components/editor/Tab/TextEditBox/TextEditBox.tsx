import FontSelectBox from '@/components/editor/Tab/TextEditBox/components/FontSelectBox';
import { availableFontFamily } from '@/components/text/TextFormat';

const TextEditBox = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex px-[20px] py-[19px] text-[17px] font-extrabold">
        텍스트
      </div>
      <div className="px-[15px]">
        <FontSelectBox list={availableFontFamily} />
      </div>
    </div>
  );
};

export default TextEditBox;
