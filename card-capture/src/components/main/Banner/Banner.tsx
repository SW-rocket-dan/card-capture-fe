import BannerBg from '@/components/main/Banner/components/BannerBg/BannerBg';
import BannerText from '@/components/main/Banner/components/BannerText/BannerText';

const Banner = () => {
  return (
    <div className="relative h-full w-full">
      <BannerBg />
      <div className="absolute left-1/2 top-1/4 z-10" style={{ transform: 'translate(-50%, -50%)' }}>
        <BannerText />
      </div>
    </div>
  );
};

export default Banner;
