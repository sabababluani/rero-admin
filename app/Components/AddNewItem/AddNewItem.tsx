'use client';

import { usePathname } from 'next/navigation';
import styles from './AddNewItem.module.scss';
import Link from 'next/link';
import { AddNewItemPropsInterfaces } from './interfaces/add-new-item-props.interface';

const AddNewItem = (props: AddNewItemPropsInterfaces) => {
  const pathname = usePathname();
  const isActive = pathname === '/musicadd' || pathname === '/artists/artistadd' || pathname === '/albums/albumadd';

  return (
    <Link href={props.href}>
      <div className={`${styles.container} ${isActive && styles.active}`}>
        <p>Add New</p>
      </div>
    </Link>
  );
};

export default AddNewItem;
