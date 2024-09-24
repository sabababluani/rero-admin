'use client';

import Cookies from 'js-cookie';
import Image from 'next/image';
import styles from './SideHeader.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import { navigationData } from './utils/NavigationData';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const SideHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login')
  };

  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <Image src="/favicon.png" alt="logo" width={96} height={88} />
      </Link>
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
      <div className={styles.containerWrapper}>
        <NavigationItem
          title={'Log Out'}
          link={'/login'}
          isActive={false}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default SideHeader;
