import { SVGProps } from 'react';

const UpArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13 7L7 1M7 1L1 7M7 1V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpArrowIcon;
