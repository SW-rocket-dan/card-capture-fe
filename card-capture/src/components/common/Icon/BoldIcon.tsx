import { SVGProps } from 'react';

const BoldIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 7.66654H7.66667C9.50762 7.66654 11 6.17416 11 4.33321C11 2.49226 9.50762 0.999878 7.66667 0.999878H1V7.66654ZM1 7.66654H8.5C10.3409 7.66654 11.8333 9.15893 11.8333 10.9999C11.8333 12.8408 10.3409 14.3332 8.5 14.3332H1V7.66654Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BoldIcon;
