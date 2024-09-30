import { SVGProps } from 'react';

const PasteIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.75 6.24258V9.96007C16.75 10.4641 16.75 10.7161 16.8454 10.9087C16.9293 11.078 17.0631 11.2157 17.2278 11.302C17.4149 11.4001 17.66 11.4001 18.15 11.4001H21.7642M16.75 19.5H11.5M18.5 15.9H11.5M22 13.1894V19.68C22 21.1921 22 21.9482 21.7139 22.5258C21.4622 23.0338 21.0607 23.4469 20.5667 23.7057C20.0052 24 19.2701 24 17.8 24H12.2C10.7299 24 9.99479 24 9.43327 23.7057C8.93935 23.4469 8.53778 23.0338 8.28611 22.5258C8 21.9482 8 21.1921 8 19.68V10.32C8 8.80786 8 8.05179 8.28611 7.47423C8.53778 6.96619 8.93935 6.55314 9.43327 6.29428C9.99479 6 10.7299 6 12.2 6H15.0103C15.6524 6 15.9734 6 16.2755 6.0746C16.5433 6.14074 16.7994 6.24983 17.0342 6.39787C17.2992 6.56484 17.5262 6.79833 17.9802 7.2653L20.7698 10.1347C21.2238 10.6017 21.4508 10.8352 21.6132 11.1076C21.7571 11.3492 21.8632 11.6126 21.9275 11.8881C22 12.1988 22 12.529 22 13.1894Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PasteIcon;