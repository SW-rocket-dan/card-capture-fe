import React from 'react';
import './BannerBg.styles.css';

const BannerBg = () => {
  return (
    <div className="bg-bannerbg absolute left-0 top-0 z-[-10] h-dvh w-full overflow-hidden pt-[65px]">
      <div className="left-top-gradation" />
      <div className="left-bottom-gradation" />
      <div className="right-middle-gradation" />
      <div className="right-bottom-gradation" />
    </div>
  );
};

export default BannerBg;
