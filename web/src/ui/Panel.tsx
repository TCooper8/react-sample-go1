import React from 'react';

import clsx from 'clsx';
import styles from './Panel.module.scss';

export default ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return <div
    {...props}
    className={clsx(
      className,
      styles.panel,
    )}
  />
}