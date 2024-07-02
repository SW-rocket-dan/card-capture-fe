import { SVGProps } from 'react';

const UnderlineIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.0002 1.00006V6.83339C13.0002 9.59482 10.7616 11.8334 8.00016 11.8334C5.23874 11.8334 3.00016 9.59482 3.00016 6.83339V1.00006M1.3335 15.1667H14.6668"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default UnderlineIcon;
