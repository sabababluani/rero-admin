'use client';

import Image from 'next/image';
import styles from './SideHeader.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import { navigationData } from './utils/NavigationData';
import { usePathname } from 'next/navigation';

const SideHeader = () => {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <Image src="/favicon.png" alt="logo" width={96} height={88} />
      <div className={styles.container}>
        {navigationData.map((item) => (
          <NavigationItem
            key={item.link}
            title={item.title}
            link={item.link}
            isActive={pathname === item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default SideHeader;
