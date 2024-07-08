import { SVGProps } from 'react';

const ItalicIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.8334 1.33325H5.33341M8.66675 14.6666H1.16675M9.50008 1.33325L4.50008 14.6666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ItalicIcon;
