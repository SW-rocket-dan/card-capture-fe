import { SVGProps } from 'react';

const DownArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13 9L7 15M7 15L1 9M7 15V1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownArrowIcon;
