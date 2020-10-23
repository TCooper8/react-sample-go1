import React from 'react';

import clsx from 'clsx';
import styles from './Image.module.scss';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;
export default ({ className, ...props }: Props) => {
  return <img
    {...props}
    alt=""
    className={clsx(
      className,
      styles.image,
    )}
  />
}