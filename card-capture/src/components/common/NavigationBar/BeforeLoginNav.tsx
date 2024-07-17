import Button from '@/components/common/Button/Button';

const BeforeLoginNav = () => {
  return (
    <div className="flex-w flex flex-row items-center justify-between gap-[30px] lg:gap-[60px]">
      <ul className="text-md flex flex-row gap-[30px] text-xs font-semibold lg:gap-[50px] lg:text-sm">
        <li>다른 템플릿 보기</li>
        <li>요금제</li>
      </ul>

      <div className="flex flex-row gap-2.5">
        <Button type="default" className="h-[40px] w-[110px] rounded-[10px]">
          <p className="text-[14px]">Login</p>
        </Button>
        <Button type="full" className="h-[40px] w-[110px] rounded-[10px]">
          <p className="text-[14px]">제작하기</p>
        </Button>
      </div>
    </div>
  );
};

export default BeforeLoginNav;
