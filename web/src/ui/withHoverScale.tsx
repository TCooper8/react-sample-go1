import clsx from 'clsx';

import styles from './withHoverScale.module.scss';

export default (binding: (_:React.HTMLAttributes<HTMLElement>) => JSX.Element) => ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return binding({
    ...props,
    className: clsx(className, styles.hoverScale),
  });
}