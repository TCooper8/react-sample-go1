import React from 'react';

import clsx from 'clsx';
import styles from './Button.module.scss';
import withHoverScale from './withHoverScale';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
}
export default withHoverScale(({ className, ...props }: Props) => {
  return <button
    {...props}
    className={clsx(
      styles.btn,
      className,
    )}
  />
})