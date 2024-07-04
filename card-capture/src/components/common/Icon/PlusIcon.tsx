import { SVGProps } from 'react';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.83333 1V12.6667M1 6.83333H12.6667"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
