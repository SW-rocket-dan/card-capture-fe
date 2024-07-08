import Button from '@/components/common/Button/Button';

const BeforeLoginNav = () => {
  return (
    <div className="flex flex-row items-center gap-[60px]">
      <ul className="flex flex-row gap-[50px] font-medium">
        <li>Home</li>
        <li>다른 템플릿 보기</li>
        <li>요금제</li>
      </ul>
      <div className="flex flex-row gap-2.5">
        <Button type="default" className="h-[44px] w-[120px] rounded-[10px]">
          <p className="text-[16px]">Login</p>
        </Button>
        <Button type="full" className="h-[44px] w-[120px] rounded-[10px]">
          <p className="text-[16px]">제작하기</p>
        </Button>
      </div>
    </div>
  );
};

export default BeforeLoginNav;
