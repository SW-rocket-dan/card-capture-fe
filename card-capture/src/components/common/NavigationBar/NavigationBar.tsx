import BeforeLoginNav from '@/components/common/NavigationBar/BeforeLoginNav';

const NavigationBar = () => {
  return (
    <div className="flex w-full h-[80px] bg-white border-b-[1px] border-border px-[30px] items-center justify-between">
      <div className="text-lg">Card Capture</div>
      <BeforeLoginNav />
    </div>
  );
};

export default NavigationBar;
