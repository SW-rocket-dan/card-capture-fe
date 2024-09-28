import { SVGProps } from 'react';

interface TrashIconProps extends SVGProps<SVGSVGElement> {
  strokeWidth?: number;
}

const TrashIcon = ({ strokeWidth = 1.7, ...props }: TrashIconProps) => {
  return (
    <svg viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.3333 4.33333V3.66667C12.3333 2.73325 12.3333 2.26654 12.1517 1.91002C11.9919 1.59641 11.7369 1.34144 11.4233 1.18166C11.0668 1 10.6001 1 9.66667 1H8.33333C7.39991 1 6.9332 1 6.57668 1.18166C6.26308 1.34144 6.00811 1.59641 5.84832 1.91002C5.66667 2.26654 5.66667 2.73325 5.66667 3.66667V4.33333M7.33333 8.91667V13.0833M10.6667 8.91667V13.0833M1.5 4.33333H16.5M14.8333 4.33333V13.6667C14.8333 15.0668 14.8333 15.7669 14.5608 16.3016C14.3212 16.772 13.9387 17.1545 13.4683 17.3942C12.9335 17.6667 12.2335 17.6667 10.8333 17.6667H7.16667C5.76654 17.6667 5.06647 17.6667 4.53169 17.3942C4.06129 17.1545 3.67883 16.772 3.43915 16.3016C3.16667 15.7669 3.16667 15.0668 3.16667 13.6667V4.33333"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
