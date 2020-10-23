import React from 'react';

import clsx from 'clsx';
import styles from './TextInput.module.scss';

type Props = {
  value: any;
  setValue?: any;
  onEnter?: any;
} & React.HTMLAttributes<HTMLElement>;

export default ({ value, setValue, className, onEnter, ...props}: Props) => {

  const onKeyPress = (e:any) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      return onEnter && onEnter(e);
    }
    return false;
  }

  const onChange = (e:any) => {
    setValue(e.target.value);
  }

  return <>
    <input
      {...props}
      className={clsx(styles.textInput, className)}
      type="text"
      onKeyPress={onKeyPress}
      onChange={onChange}
    />
  </>
}