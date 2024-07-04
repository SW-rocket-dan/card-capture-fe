import { SVGProps } from 'react';

const DownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 4L4.82843 6.82843L7.65685 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default DownIcon;
