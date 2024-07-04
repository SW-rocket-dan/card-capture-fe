import { SVGProps } from 'react';

const TextIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1 3.5C1 2.72343 1 2.33515 1.12687 2.02886C1.29602 1.62048 1.62048 1.29602 2.02886 1.12687C2.33515 1 2.72343 1 3.5 1H11.8333C12.6099 1 12.9982 1 13.3045 1.12687C13.7129 1.29602 14.0373 1.62048 14.2065 2.02886C14.3333 2.33515 14.3333 2.72343 14.3333 3.5M5.16667 14.3333H10.1667M7.66667 1V14.3333"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default TextIcon;
