import React from 'react';
import './BannerBg.styles.css';

const BannerBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-bannerbg relative h-dvh w-full overflow-hidden pt-[65px]">
      <div className="left-top-gradation" />
      <div className="left-bottom-gradation" />
      <div className="right-middle-gradation" />
      <div className="right-bottom-gradation" />
      {children}
    </div>
  );
};

export default BannerBg;
