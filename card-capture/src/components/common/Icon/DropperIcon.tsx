import { SVGProps } from 'react';

const DropperIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.14413 3.61953L10.3805 7.85587M1 13C1 13 3.72336 12.6974 5.23634 11.1844L12.4986 3.92212C13.1671 3.25365 13.1671 2.16983 12.4986 1.50136C11.8302 0.832882 10.7464 0.83288 10.0779 1.50136L2.81558 8.76366C1.3026 10.2766 1 13 1 13Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DropperIcon;
