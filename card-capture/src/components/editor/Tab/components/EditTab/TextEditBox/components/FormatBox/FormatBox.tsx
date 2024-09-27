import BoldIcon from '@/components/common/Icon/BoldIcon';
import ItalicIcon from '@/components/common/Icon/ItalicIcon';
import UnderlineIcon from '@/components/common/Icon/UnderlineIcon';
import useTextFormatting from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextFormatting';

type FormatBoxProps = {
  ratio?: number;
};

const FormatBox = ({ ratio = 1 }: FormatBoxProps) => {
  const { changeTextFormatHandler } = useTextFormatting();

  return (
    <div
      className={`flex w-full flex-row items-center justify-between gap-1 ${ratio == 1 ? 'px-[15px]' : ''}`}
      style={{ transform: `scale(${ratio})` }}
    >
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-md">
        <div className="cursor-pointer" onClick={() => changeTextFormatHandler('bold')}>
          <BoldIcon width={14} className="hover:text-main" />
        </div>
      </div>

      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-md">
        <div className="cursor-pointer" onClick={() => changeTextFormatHandler('italic')}>
          <ItalicIcon width={15} className="hover:text-main" />
        </div>
      </div>

      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-md">
        <div className="cursor-pointer" onClick={() => changeTextFormatHandler('underline')}>
          <UnderlineIcon width={19} className="hover:text-main" />
        </div>
      </div>
    </div>
  );
};

export default FormatBox;
