import React from 'react';

type ButtonProps = {
  type: 'default' | 'full';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Button = ({ type, className, onClick, children }: ButtonProps) => {
  return (
    <button
      className={`${type === 'default' ? 'border-[1.5px] border-main' : 'bg-main'} flex flex-row items-center justify-center rounded-[8px] ${className}`}
      onClick={onClick}
    >
      <div className={`${type === 'default' ? 'text-main' : 'text-white'} font-extrabold`}>{children}</div>
    </button>
  );
};

export default Button;
