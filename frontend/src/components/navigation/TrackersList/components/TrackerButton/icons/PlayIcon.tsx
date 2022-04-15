import { FC } from 'react';

const DEFAULT_SIZE = 32;

interface Props {
  size?: number;
}

const PlayIcon: FC<Props> = ({ size = DEFAULT_SIZE }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clip-path='url(#clip0_119_572)'>
      <path
        d='M7.0001 6.8037C7.0001 5.2641 8.66676 4.30185 10.0001 5.07165L19.0001 10.2678C20.3334 11.0376 20.3334 12.9621 19.0001 13.7319L10.0001 18.9281C8.66677 19.6979 7.0001 18.7356 7.0001 17.196L7.0001 6.8037Z'
        fill='currentColor'
      />
    </g>
    <defs>
      <clipPath id='clip0_119_572'>
        <rect width={size} height={size} fill='currentColor' />
      </clipPath>
    </defs>
  </svg>
);

export default PlayIcon;
