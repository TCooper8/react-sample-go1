import React from 'react';

import clsx from 'clsx';
import styles from './Grid.module.scss';

type Props = {
  center?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default ({ center, ...props }: Props) => {
  return <div
    {...props}
    className={clsx(styles.grid, center && styles.center)}
  />
}