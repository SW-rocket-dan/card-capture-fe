import React from 'react';

type PromptTitleProps = {
  children: React.ReactNode;
};

const PromptTitleText = ({ children }: PromptTitleProps) => {
  return <div className="tracking-little-tight text-[16px] font-semibold text-defaultBlack">{children}</div>;
};

export default PromptTitleText;
