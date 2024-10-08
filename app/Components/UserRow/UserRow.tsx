'use client';

import { useState } from 'react';
import SurePopup from '../SurePopUp/SurePopUp';
import styles from './UserRow.module.scss';
import { UserRowPropsInterface } from './interface/user-row-props.interface';
import Image from 'next/image';
import Link from 'next/link';

const UserRow = (props: UserRowPropsInterface) => {
  const [userDelete, setUserDelete] = useState(false);
  const [userBlock, setUserBlock] = useState(false);

  const onHandleDeleteConfirm = () => {
    setUserDelete(false);
    props.onDelete(props.id);
  };

  const onHandleBlockConfirm = () => {
    setUserBlock(false);
    props.onBlock(props.id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p>{props.email}</p>
      </div>
      <div className={styles.imageContainer}>
        <Link href={`/users/${props.id}`} className={styles.editLink}>
          <Image src="/edituser.png" alt="edit" width={28} height={28} />
        </Link>
        <div
          className={props.banned ? styles.highlightedBlock : styles.block}
          onClick={() => setUserBlock(true)}
        >
          <Image src="/block.png" alt="block" width={28} height={28} />
        </div>
        <div className={styles.delete} onClick={() => setUserDelete(true)}>
          <Image src="/garbage.png" alt="delete" width={28} height={28} />
        </div>
      </div>

      {userBlock && (
        <SurePopup
          onCancel={() => setUserBlock(false)}
          onConfirm={onHandleBlockConfirm}
        />
      )}
      {userDelete && (
        <SurePopup
          onCancel={() => setUserDelete(false)}
          onConfirm={onHandleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default UserRow;
