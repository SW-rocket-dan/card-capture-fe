import { SVGProps } from 'react';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.33342 0.666664L0.666748 7.33333M0.666748 0.666664L7.33342 7.33333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
