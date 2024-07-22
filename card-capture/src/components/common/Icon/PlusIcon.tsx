import { SVGProps } from 'react';

interface PlusIconProps extends SVGProps<SVGSVGElement> {
  strokeWidth?: number;
}

const PlusIcon = ({ strokeWidth = 1.5, ...props }: PlusIconProps) => {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.83333 1V12.6667M1 6.83333H12.6667"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
