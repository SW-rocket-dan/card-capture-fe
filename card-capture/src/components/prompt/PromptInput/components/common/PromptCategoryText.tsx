import React from 'react';

type PromptCategoryProps = {
  children: React.ReactNode;
};

const PromptCategoryText = ({ children }: PromptCategoryProps) => {
  return <div className="tracking-little-tight text-[12px] font-semibold text-main">{children}</div>;
};

export default PromptCategoryText;
