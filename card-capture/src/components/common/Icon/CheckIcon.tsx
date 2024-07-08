import { SVGProps } from 'react';

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2 5L4.12132 7.12132L8.36396 2.87868"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
