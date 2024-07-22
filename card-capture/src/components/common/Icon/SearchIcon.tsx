import { SVGProps } from 'react';

const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M21.5356 21L15.5108 15M17.519 10C17.519 13.866 14.372 17 10.49 17C6.60795 17 3.46094 13.866 3.46094 10C3.46094 6.13401 6.60795 3 10.49 3C14.372 3 17.519 6.13401 17.519 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
