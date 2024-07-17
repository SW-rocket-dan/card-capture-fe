import BannerBg from '@/components/main/Banner/components/BannerBg/BannerBg';
import BannerText from '@/components/main/Banner/components/BannerText/BannerText';
import BannerButton from '@/components/main/Banner/components/BannerButton/BannerButton';

const Banner = () => {
  return (
    <div className="relative h-full w-full">
      <BannerBg />
      <div className="absolute left-1/2 top-1/3 z-10" style={{ transform: 'translate(-50%, -50%)' }}>
        <div className="flex flex-col items-center justify-center gap-[25px]">
          <BannerText />
          <BannerButton />
        </div>
      </div>
    </div>
  );
};

export default Banner;
