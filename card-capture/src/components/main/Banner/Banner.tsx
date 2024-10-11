import BannerBg from '@/components/main/Banner/components/BannerBg/BannerBg';
import BannerText from '@/components/main/Banner/components/BannerText/BannerText';
import BannerButton from '@/components/main/Banner/components/BannerButton/BannerButton';
import BannerImage from '@/components/main/Banner/components/BannerImage/BannerImage';

const Banner = () => {
  return (
    <div className="relative flex h-fit w-full items-center justify-center overflow-hidden px-6 md:h-dvh">
      <BannerBg />
      <div className="flex w-fit flex-col items-center justify-center gap-[30px] py-[120px] 2xl:gap-[50px]">
        <BannerText />
        <BannerButton />
        <BannerImage />
      </div>
    </div>
  );
};

export default Banner;
