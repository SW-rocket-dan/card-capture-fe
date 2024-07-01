import { SVGProps } from 'react';

const AlignJustifyIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 17 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 4.33333H1M16 11H1M16 1H1M16 7.66667H1"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AlignJustifyIcon;
