import React, { HTMLAttributes } from 'react';

import clsx from 'clsx';
import styles from './Icon.module.scss';

type Props = {
  icon: string;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export default ({ icon, className, ...props }: Props) => {
  return <i
    className={clsx(
      'material-icons',
      styles.icon,
      className,
    )}
  >{icon}</i>
}