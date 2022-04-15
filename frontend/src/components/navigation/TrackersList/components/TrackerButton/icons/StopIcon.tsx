import { FC } from 'react';

const DEFAULT_SIZE = 32;

interface Props {
  size?: number;
}

const PauseIcon: FC<Props> = ({ size = DEFAULT_SIZE }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='6' y='4' width='4' height='15' rx='2' fill='currentColor' />
    <rect x='14' y='4' width='4' height='15' rx='2' fill='currentColor' />
  </svg>
);

export default PauseIcon;
