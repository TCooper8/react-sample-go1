import React from 'react';
import { useLocation } from 'react-router-dom';

import Topbar from '../ui/Topbar';
import Text from '../ui/Text';
import Icon from '../ui/Icon';
import Tag from '../ui/Tag';

import clsx from 'clsx';
import styles from './Nav.module.scss';

type NavIconProps = {
  tag: string;
  icon: string;
  alts?: string[];
};

const NavIcon = ({ tag, icon, alts }: NavIconProps) => {
  const location = useLocation();
  const active = location.pathname === tag || alts?.includes(location.pathname);

  if (active) {
    return <Icon
      icon={icon}
      className={clsx(styles.activeIcon)}
    />
  }

  return <Tag tag={tag}>
    <Icon
      icon={icon}
      className={styles.icon} />
  </Tag>
}

export default () => {
  return <Topbar className={styles.nav}>
    <div className={styles.title}>
      <Text large>
        Go1 Test
      </Text>
    </div>
    <NavIcon icon="help_outline" tag="/about" />
    <NavIcon icon="home" tag="/home" alts={[ "", "/" ]} />
  </Topbar>
}