import React from 'react';

type ButtonProps = {
  type: 'default' | 'full';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  shadow?: boolean;
  disable?: boolean;
};

const Button = ({ type, className, onClick, children, shadow = false, disable = false }: ButtonProps) => {
  return (
    <button
      disabled={disable}
      type="submit"
      className={`${type === 'default' ? 'border-[1px] border-main bg-white' : 'bg-main'} flex flex-row items-center justify-center gap-1.5 shadow-sm ${type === 'default' ? 'text-main' : 'text-white'} font-semibold ${className}`}
      onClick={onClick}
      style={shadow ? { boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' } : {}}
    >
      {children}
    </button>
  );
};

export default Button;
