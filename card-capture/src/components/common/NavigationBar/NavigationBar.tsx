import BeforeLoginNav from '@/components/common/NavigationBar/BeforeLoginNav';

const NavigationBar = () => {
  return (
    <div className="fixed left-0 top-0 flex min-h-[70px] w-full items-center justify-between border-b-[1px] border-border bg-white px-[30px]">
      <div className="text-lg">Card Capture</div>
      <BeforeLoginNav />
    </div>
  );
};

export default NavigationBar;
