import React, { forwardRef, useEffect, useState } from 'react';

type ButtonProps = {
  type: 'default' | 'full';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  shadow?: boolean;
  disable?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, className, onClick, children, shadow = false, disable = false }, ref) => {
    const [mainColor, setMainColor] = useState<string>('main');

    useEffect(() => {
      if (disable) setMainColor('gray5');
      else setMainColor('main');
    }, [disable]);

    return (
      <button
        ref={ref}
        disabled={disable}
        type="submit"
        className={` ${type === 'default' ? `border-[1px] border-${mainColor} bg-white` : `bg-${mainColor}`} flex flex-row items-center justify-center gap-1.5 shadow-sm ${type === 'default' ? `text-${mainColor}` : 'text-white'} font-semibold ${!className?.includes('rounded') ? 'rounded-[8px]' : ''} ${className || ''} `.trim()}
        onClick={onClick}
        style={shadow ? { boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' } : {}}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
