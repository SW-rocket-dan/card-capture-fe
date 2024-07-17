import MoveToFrontIcon from '@/components/common/Icon/MoveToFrontIcon';
import MoveToFirstIcon from '@/components/common/Icon/MoveToFirstIcon';
import MoveToBackIcon from '@/components/common/Icon/MoveToBackIcon';
import MoveToLastIcon from '@/components/common/Icon/MoveToLastIcon';

const OrderBox = () => {
  const clickMoveToFrontHandler = () => {};
  const clickMoveToFirstHandler = () => {};
  const clickMoveToBackHandler = () => {};
  const clickMoveToLastHandler = () => {};

  return (
    <div className="flex flex-row items-center justify-between rounded-[10px] border-[1px] border-border px-[10px] py-[10px]">
      <p className="text-xs text-gray4">순서</p>
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={clickMoveToFrontHandler}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
        >
          <MoveToFrontIcon width={17} />
        </button>
        <button
          onClick={clickMoveToFirstHandler}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
        >
          <MoveToFirstIcon width={17} />
        </button>
        <button
          onClick={clickMoveToBackHandler}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
        >
          <MoveToBackIcon width={17} />
        </button>
        <button
          onClick={clickMoveToLastHandler}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-itembg"
        >
          <MoveToLastIcon width={17} />
        </button>
      </div>
    </div>
  );
};

export default OrderBox;
