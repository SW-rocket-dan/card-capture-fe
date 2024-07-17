import { SVGProps } from 'react';

const AngleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 0V8H9" stroke="currentColor" />
      <path
        d="M1 4V3.5H0.5V4H1ZM5 8V8.5H5.5V8H5ZM1 8H0.5V8.5H1V8ZM1 4.5C2.933 4.5 4.5 6.067 4.5 8H5.5C5.5 5.51472 3.48528 3.5 1 3.5V4.5ZM1.5 8V4H0.5V8H1.5ZM5 7.5H1V8.5H5V7.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default AngleIcon;
