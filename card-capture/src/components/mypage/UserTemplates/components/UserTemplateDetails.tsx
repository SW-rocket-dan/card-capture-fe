import Button from '@/components/common/Button/Button';
import HeartIcon from '@/components/common/Icon/HeartIcon';
import CheckIcon from '@/components/common/Icon/CheckIcon';

const UserTemplateDetails = () => {
  return (
    <div className="flex w-fit flex-col gap-2 rounded-[20px] border border-border p-4">
      <div className="h-[280px] w-[280px] rounded-[20px] bg-gray8 sm:h-[220px] sm:w-[220px] md:h-[270px] md:w-[270px]"></div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex flex-row justify-between">
          <p className="text-[17px] font-semibold">title</p>

          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center justify-end gap-1">
              <HeartIcon width={20} className="text-heart" />
              <p className="text-xs text-gray5">30</p>
            </div>
            <div className="flex flex-row items-center justify-end gap-1">
              <CheckIcon width={20} className="text-blue-500" />
              <p className="text-xs text-gray5">30</p>
            </div>
          </div>
        </div>

        <p className="text-[14px] text-gray2">description</p>
        <div className="flex flex-row gap-2 text-xs text-gray5">
          <p>#tag</p>
          <p>#tag</p>
          <p>#tag</p>
        </div>
        <div className="mt-2 flex flex-row gap-2">
          <Button className="w-full rounded-md py-2 text-[13px]" type="full">
            에디터로 이동
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTemplateDetails;
