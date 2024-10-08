import Image from 'next/image';
import styles from './AlbumRow.module.scss';
import { useState } from 'react';
import SurePopup from '../SurePopUp/SurePopUp';
import { AlbumPropsInterface } from './interfaces/album-row-props.interface';
import BaseApi from '../../api/BaseApi';

const AlbumRow = (props: AlbumPropsInterface) => {
  const [musicDelete, setMusicDelete] = useState(false);

  const onHandleDelete = () => {
    setMusicDelete(true);
  };

  const onHandleDeleteConfirm = async () => {
    setMusicDelete(false);
    try {
      await BaseApi.delete(`/album/${props.id}`);
      props.onDelete(props.id);
    } catch (error) {
      alert('Could not delete album');
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Image
            src={props.albumCover}
            alt="artist cover"
            width={60}
            height={60}
          />
          <p>{props.name}</p>
        </div>
        <div>
          <p>{props.artistName}</p>
        </div>
        <div className={styles.actionContainer}>
          <div
            className={styles.songs}
          >{`${props.songCount} ${props.songCount > 0 ? 'Songs' : 'Song'}`}</div>
          <div className={styles.garbageSpan} onClick={onHandleDelete}>
            <Image src={'/garbage.png'} alt="trash" width={22} height={22} />
          </div>
        </div>
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

export default AlbumRow;
