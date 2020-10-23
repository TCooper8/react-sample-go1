import React from 'react'; 
import { useHistory } from 'react-router-dom';

type Props = {
  tag?: string;
} & React.HTMLAttributes<HTMLElement>;

export default ({ tag, onClick, children, ...props }: Props) => {
  const history = useHistory();
  const _onClick = onClick || ((e:any) => {
    e.preventDefault();
    if (tag) history.push(tag);
  });

  if (tag) {
    return <a
      {...props}
      onClick={_onClick}
      role={"button"}
      href={tag}
    >
      {children}
    </a>
  }

  return <div
    {...props}
    onClick={_onClick}
  />
}