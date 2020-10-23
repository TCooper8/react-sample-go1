import React from 'react';

import clsx from 'clsx';
import styles from './Topbar.module.scss';

export default ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return <div
    className={clsx(styles.topbar, className)}
    {...props}
  />
}