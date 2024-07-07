import { SVGProps } from 'react';

const PromptIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.0693 15L23 10L18.0693 5M5.9307 5L1 10L5.9307 15M13.6525 1L9.70789 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PromptIcon;
