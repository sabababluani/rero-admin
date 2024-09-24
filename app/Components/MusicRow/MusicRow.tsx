import { useState } from 'react';
import styles from './MusicRow.module.scss';
import Image from 'next/image';
import SurePopup from '../SurePopUp/SurePopUp';
import { MusicRowPropsInterface } from './interfaces/music-row-props.inteface';

const MusicRow = (props: MusicRowPropsInterface) => {
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
      <div className={styles.container}>
        <div className={styles.musicContainer}>
          <div className={styles.cover}>
            <Image src={props.cover} alt="Music cover" width={60} height={60} />
          </div>
          <div className={styles.infoContainer}>
            <span className={styles.musicSpan}>{props.music}</span>
            <span className={styles.artistSpan}>{props.artistName}</span>
          </div>
        </div>
        <div>
          <span className={styles.albumSpan}>{props.album}</span>
        </div>
        <div className={styles.wrapper}>
          <div>
            <span className={styles.durationSpan}>{props.duration}</span>
          </div>
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

export default MusicRow;
