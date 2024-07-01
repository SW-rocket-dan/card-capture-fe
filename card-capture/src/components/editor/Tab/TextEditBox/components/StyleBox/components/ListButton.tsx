import ListIcon from '@/components/common/Icon/ListIcon';

const ListButton = () => {
  const handleClickList = () => {
    // 기능 추가 예정
  };

  return (
    <button
      onClick={handleClickList}
      className="flex h-[37px] w-[37px] items-center justify-center rounded-md hover:bg-itembg"
    >
      <ListIcon height={20} className="text-defaultBlack" />
    </button>
  );
};

export default ListButton;
