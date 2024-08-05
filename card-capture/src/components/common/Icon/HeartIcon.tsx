import { SVGProps } from 'react';

const HeartIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99486 3.85186C7.49535 2.0988 4.99481 1.62723 3.11602 3.23251C1.23723 4.83779 0.972726 7.52173 2.44815 9.4203C3.67486 10.9988 7.38733 14.3281 8.60408 15.4056C8.7402 15.5262 8.80827 15.5865 8.88766 15.6101C8.95695 15.6308 9.03277 15.6308 9.10207 15.6101C9.18146 15.5865 9.24952 15.5262 9.38565 15.4056C10.6024 14.3281 14.3149 10.9988 15.5416 9.4203C17.017 7.52173 16.7848 4.8209 14.8737 3.23251C12.9626 1.64412 10.4944 2.0988 8.99486 3.85186Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default HeartIcon;
