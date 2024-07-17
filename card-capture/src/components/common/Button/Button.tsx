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
      type="submit"
      className={`${type === 'default' ? 'border-[1.5px] border-main bg-white' : 'bg-main'} flex flex-row items-center justify-center rounded-[8px] shadow-sm ${type === 'default' ? 'text-main' : 'text-white'} font-bold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
