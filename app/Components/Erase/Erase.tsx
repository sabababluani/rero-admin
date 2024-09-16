import { useState } from 'react';
import styles from './Erase.module.scss';
import Image from 'next/image';

const Erase = () => {

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
    <div>
      <div
        className={props.isBlocked ? styles.highlightedBlock : styles.block}
        onClick={() => setUserBlock(true)}
      >
        <Image src="/block.png" alt="block" width={28} height={28} />
      </div>
      <div className={styles.delete} onClick={() => setUserDelete(true)}>
        <Image src="/garbage.png" alt="delete" width={28} height={28} />
      </div>
    </div>
  );
};

export default Erase;
