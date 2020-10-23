import React from 'react';

import clsx from 'clsx';
import styles from './Transition.module.scss';

type Props = {
  open: boolean;
  children: any;
};
const Content = ({ open, children }: Props) => {
  if (!open) return <></>;
  return <>{children}</>;
}

export default ({ open, children }: Props) => {
  return <div className={clsx(open && styles.mount)}>
    <Content open={open}>
      {children}
    </Content>
  </div>;
}