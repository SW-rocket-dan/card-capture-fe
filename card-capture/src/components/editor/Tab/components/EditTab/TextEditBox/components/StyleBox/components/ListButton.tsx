import ListIcon from '@/components/common/Icon/ListIcon';
import useTextFormatting from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextFormatting';

const ListButton = () => {
  const { changeTextFormatHandler } = useTextFormatting();

  return (
    <button
      onClick={() => changeTextFormatHandler('list')}
      className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
    >
      <ListIcon height={15} className="text-defaultBlack" />
    </button>
  );
};

export default ListButton;
