import RightTopBorderIcon from '@/components/common/Icon/RightTopBorderIcon';
import RightBottomBorderIcon from '@/components/common/Icon/RightBottomBorderIcon';
import LockIcon from '@/components/common/Icon/LockIcon';
import CutIcon from '@/components/common/Icon/CutIcon';
import AngleIcon from '@/components/common/Icon/AngleIcon';

const SizeBox = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      {/* 높이, 너비 입력 */}
      <div className="flex flex-row items-center">
        <div className="flex flex-col gap-[10px]">
          <div className="flex w-[130px] flex-row items-center rounded-md bg-itembg px-[13px] py-[10px]">
            <input type="number" className="w-[95px] bg-transparent outline-none" />
            <span className="text-sm text-gray5">W</span>
          </div>
          <div className="flex w-[130px] flex-row items-center rounded-md bg-itembg px-[13px] py-[10px]">
            <input type="number" className="w-[97px] bg-transparent outline-none" />
            <span className="text-sm text-gray5">H</span>
          </div>
        </div>

        {/* 잠금 버튼 */}
        <div className="flex flex-col gap-1">
          <RightTopBorderIcon height={18} className="text-gray6" />
          <button>
            <LockIcon width={16} className="ml-[7px] text-gray5" />
          </button>
          <RightBottomBorderIcon height={18} className="text-gray6" />
        </div>
      </div>

      {/* 자르기, 각도 변환 */}
      <div className="flex flex-col gap-[10px]">
        <button className="bg-gray7 flex w-[115px] flex-row items-center justify-center gap-[7px] rounded-lg py-[10px] text-white">
          <CutIcon width={15} />
          <span>자르기</span>
        </button>
        <div className="flex w-[115px] flex-row items-center justify-between rounded-md bg-itembg px-[12px] py-[10px]">
          <input type="number" className="w-[80px] bg-transparent outline-none" />
          <AngleIcon className="text-gray5" />
        </div>
      </div>
    </div>
  );
};

export default SizeBox;
