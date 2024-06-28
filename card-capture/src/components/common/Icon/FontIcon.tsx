import { SVGProps } from 'react';

const FontIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.3335 4.08334C2.3335 3.53975 2.3335 3.26795 2.4223 3.05355C2.54071 2.76768 2.76783 2.54056 3.0537 2.42215C3.2681 2.33334 3.5399 2.33334 4.0835 2.33334H9.91683C10.4604 2.33334 10.7322 2.33334 10.9466 2.42215C11.2325 2.54056 11.4596 2.76768 11.578 3.05355C11.6668 3.26795 11.6668 3.53975 11.6668 4.08334M5.25016 11.6667H8.75016M7.00016 2.33334V11.6667"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default FontIcon;
