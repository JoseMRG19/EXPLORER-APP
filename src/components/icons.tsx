import React from 'react';

type IconName =
  | 'star'
  | 'list'
  | 'heart'
  | 'search'
  | 'status'
  | 'species'
  | 'back'
  | 'next'
  | 'prev'
  | 'filter'
  | 'spark'
  | 'chevron'
  | 'alien'
  | 'alive'
  | 'dead'
  | 'unknown';

const iconPaths: Record<IconName, string> = {
  star:
    'M12 3.5l2.5 5.1 5.6.8-4 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-4 5.6-.8L12 3.5z',
  list:
    'M4 6h16M4 12h16M4 18h16',
  heart:
    'M12 20.5l-1.3-1.2C6.4 15.4 4 13.1 4 10a4 4 0 0 1 7-2.4A4 4 0 0 1 18 10c0 3.1-2.4 5.4-6.7 9.3L12 20.5z',
  search:
    'M15.5 15.5l4 4M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z',
  status:
    'M12 6v6l4 2',
  species:
    'M4 14c3-4 13-4 16 0M8 9c2-2 6-2 8 0',
  back:
    'M6 12h12M6 12l4-4M6 12l4 4',
  next:
    'M8 6l8 6-8 6',
  prev:
    'M16 6l-8 6 8 6',
  filter:
    'M4 6h16l-6 7v5l-4 2v-7L4 6z',
  spark:
    'M12 3l1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3z',
  chevron:
    'M6 9l6 6 6-6',
  alien:
    'M12 4c4 0 7 3.2 7 7.5 0 4.3-3.3 7.5-7 7.5s-7-3.2-7-7.5C5 7.2 8 4 12 4z M9 11c0 .9-.7 1.5-1.6 1.5-.9 0-1.6-.6-1.6-1.5S6.5 9.5 7.4 9.5 9 10.1 9 11z M18.2 11c0 .9-.7 1.5-1.6 1.5-.9 0-1.6-.6-1.6-1.5s.7-1.5 1.6-1.5c.9 0 1.6.6 1.6 1.5z',
  alive:
    'M4 12h4l2-4 3 8 2-4h5',
  dead:
    'M6 6l12 12M18 6l-12 12',
  unknown:
    'M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.8.7-1.2 1.1-1.2 2.2M12 17h.01'
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
}

export default function Icon({
  name,
  size = 18,
  className,
  title
}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : 'presentation'}
    >
      {title ? <title>{title}</title> : null}
      <path d={iconPaths[name]} />
    </svg>
  );
}
