import { SVGProps } from 'react';

const FontAIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.8 9.55872L12.2 9.55872M1 15L6.98039 2.21605C7.30431 1.52362 7.46627 1.17741 7.6907 1.07C7.88571 0.976667 8.11429 0.976667 8.3093 1.07C8.53373 1.17741 8.69569 1.52362 9.01961 2.21605L15 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FontAIcon;
