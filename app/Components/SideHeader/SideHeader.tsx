import Image from 'next/image';
import styles from './SideHeader.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import { navigationData } from './utils/NavigationData';

const SideHeader = () => {
  return (
    <div className={styles.wrapper}>
      <Image src="/favicon.png" alt="logo" width={96} height={88} />
      <div className={styles.container}>
        {navigationData.map((item) => (
          <NavigationItem title={item.title} link={item.link} />
        ))}
      </div>
    </div>
  );
};

export default SideHeader;
