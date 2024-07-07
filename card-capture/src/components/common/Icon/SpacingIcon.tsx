import { SVGProps } from 'react';

const SpacingIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.5 6.33334H9.83333M16.5 3.00001H9.83333M16.5 9.66668H9.83333M16.5 13H9.83333M4 14.6667L4 1.33334M4 14.6667L1.5 12.1667M4 14.6667L6.5 12.1667M4 1.33334L1.5 3.83334M4 1.33334L6.5 3.83334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SpacingIcon;
