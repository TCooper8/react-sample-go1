import React from 'react';

import styles from './Page.module.scss';
import Transition from '../ui/Transition';

type Props = {
  [x: string]: any;
}
export default (props: Props) => {
  const [ open, setOpen ] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setOpen(true);
  }, [props]);

  return <Transition open={open}>
    <div
    {...props}
    className={styles.page}
    />
  </Transition>
}