import React, { HTMLAttributes } from 'react';

type DivButtonProps = HTMLAttributes<HTMLDivElement> & {
  type: 'default' | 'full';
  className?: string;
  children: React.ReactNode;
};

const DivButton = ({ type, className, children, ...props }: DivButtonProps) => {
  return (
    <div
      className={`${type === 'default' ? 'border-[1px] border-main bg-white' : 'bg-main'} flex flex-row items-center justify-center gap-1.5 rounded-[8px] shadow-sm ${type === 'default' ? 'text-main' : 'text-white'} font-semibold ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default DivButton;
