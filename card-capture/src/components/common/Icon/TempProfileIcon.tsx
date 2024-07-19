import { SVGProps } from 'react';

const TempProfileIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="23" cy="22.9995" r="23" fill="#D9D9D9" />
      <mask id="mask0_1083_2269" maskUnits="userSpaceOnUse" x="4" y="4" width="38" height="38">
        <circle cx="23.0007" cy="22.9993" r="18.027" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1083_2269)">
        <circle cx="22.9999" cy="15.5402" r="6.83784" fill="white" />
        <path
          d="M10.5684 31.7029C10.5684 28.2698 13.3515 25.4866 16.7847 25.4866H29.2169C32.6501 25.4866 35.4332 28.2698 35.4332 31.7029V44.1352C35.4332 47.5684 32.6501 50.3515 29.2169 50.3515H16.7846C13.3515 50.3515 10.5684 47.5684 10.5684 44.1352V31.7029Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export default TempProfileIcon;
