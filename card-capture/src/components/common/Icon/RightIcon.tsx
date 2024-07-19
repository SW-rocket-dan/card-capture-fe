import { SVGProps } from 'react';

const RightIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 22L12 12L2 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default RightIcon;
