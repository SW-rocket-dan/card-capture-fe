import { SVGProps } from 'react';

const ClockIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_606_651)">
        <path
          d="M6.99984 3.50002V7.00002L9.33317 8.16669M12.8332 7.00002C12.8332 10.2217 10.2215 12.8334 6.99984 12.8334C3.77818 12.8334 1.1665 10.2217 1.1665 7.00002C1.1665 3.77836 3.77818 1.16669 6.99984 1.16669C10.2215 1.16669 12.8332 3.77836 12.8332 7.00002Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_606_651">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ClockIcon;
