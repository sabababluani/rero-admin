import Image from 'next/image';
import styles from './DeleteButton.module.scss';
import { useState } from 'react';
import SurePopup from '@/app/Components/SurePopUp/SurePopUp';
import { DeleteButtonPropsInterface } from './interfaces/delete-button-props.interface';

const DeleteButton = (props: DeleteButtonPropsInterface) => {
  const [musicDelete, setMusicDelete] = useState(false);

  const onHandleDelete = () => {
    setMusicDelete(true);
  };

  const onHandleDeleteConfirm = () => {
    setMusicDelete(false);
    props.onDelete(props.id);
  };

  return (
    <>
      <div className={styles.garbageSpan} onClick={onHandleDelete}>
        <Image src={'/garbage.png'} alt="trash" width={22} height={22} />
      </div>
      {musicDelete && (
        <SurePopup
          onCancel={() => setMusicDelete(false)}
          onConfirm={onHandleDeleteConfirm}
        />
      )}
    </>
  );
};

export default DeleteButton;
