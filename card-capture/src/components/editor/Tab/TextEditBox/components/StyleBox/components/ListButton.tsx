import ListIcon from '@/components/common/Icon/ListIcon';
import useTextFormatting from '@/components/editor/Tab/TextEditBox/hooks/useTextFormatting';

const ListButton = () => {
  const { changeTextFormatHandler } = useTextFormatting();

  return (
    <div
      onClick={() => changeTextFormatHandler('list')}
      className="flex h-[37px] w-[37px] items-center justify-center rounded-md hover:bg-itembg"
    >
      <ListIcon height={20} className="text-defaultBlack" />
    </div>
  );
};

export default ListButton;
