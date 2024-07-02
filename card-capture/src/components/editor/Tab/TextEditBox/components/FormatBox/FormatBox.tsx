import BoldIcon from '@/components/common/Icon/BoldIcon';
import ItalicIcon from '@/components/common/Icon/ItalicIcon';
import UnderlineIcon from '@/components/common/Icon/UnderlineIcon';

const FormatBox = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between px-[25px]">
      <BoldIcon width={17} />
      <ItalicIcon width={18} />
      <UnderlineIcon width={22} />
    </div>
  );
};

export default FormatBox;
