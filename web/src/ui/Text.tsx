import React from 'react';

import clsx from 'clsx';
import styles from './Text.module.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  /**
   * If true, this text will be displayed like an error.
   */
  error?: boolean;
  /**
   * If true, a <p> tag will be used. Else, a <span> will be used to avoid placing a block element next to inline elements.
   */
  paragraph?: boolean;
  /**
   * Standard size, mini.
   */
  mini?: boolean;
  /**
   * Standard size, small.
   */
  small?: boolean;
  /**
   * Standard size, medium.
   */
  medium?: boolean;
  /**
   * Standard size, large.
   */
  large?: boolean;
  /**
   * Capitalize text-transform.
   */
  capitalize?: boolean;
  /**
   * Bold font-weight.
   */
  bold?: boolean;
  /**
   * If true, centering will be applied to the text.
   */
  center?: boolean;
  className?: string;
  [x: string]: any;
}

/**
 * Text component to be used to maintain text standards for sizing and positioning.
 */
export default ({
  error,
  paragraph,
  mini,
  small,
  medium,
  large,
  capitalize,
  bold,
  center,
  className,
  ...props
}: Props) => {
  const Component = paragraph ?
    ((ps: any) => <p {...ps} />)
    :
    ((ps: any) => <div {...ps} />);

  return <Component
    {...props}
    className={clsx(
      className,
      styles.text,
      error && styles.error,
      mini && styles.mini,
      small && styles.small,
      medium && styles.medium,
      large && styles.large,
      capitalize && styles.capitalize,
      bold && styles.bold,
      center && styles.center,
    )}
  />
}