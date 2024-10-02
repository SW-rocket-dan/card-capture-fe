import ListIcon from '@/components/common/Icon/ListIcon';
import useTextFormatting from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextFormatting';
import useTextStyle from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextStyle';
import { useEffect, useState } from 'react';

const ListButton = () => {
  const { changeTextFormatHandler } = useTextFormatting();
  const [isActive, setIsActive] = useState(false);

  const { textStyle, getStyles } = useTextStyle();

  useEffect(() => {
    const listStyle = getStyles('list');
    setIsActive(listStyle === 'bullet');
  }, [textStyle, getStyles]);

  return (
    <button
      onClick={() => changeTextFormatHandler('list')}
      className={`flex h-[30px] w-[30px] items-center justify-center rounded-md ${isActive ? 'bg-main' : 'bg-white hover:bg-itembg'}`}
    >
      <ListIcon height={15} className={` ${isActive ? 'text-white' : 'text-defaultBlack'}`} />
    </button>
  );
};

export default ListButton;
