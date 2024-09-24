import Image from 'next/image';
import styles from './ArtistRow.module.scss';
import { ArtistRowPropsInterface } from './interfaces/artist-row-props.interface';
import { useState } from 'react';
import SurePopup from '../SurePopUp/SurePopUp';

const ArtistRow = (props: ArtistRowPropsInterface) => {
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
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Image src={props.cover} alt="artist cover" width={60} height={60} />
          <p>{props.artistName}</p>
        </div>
        <div>
          <p>{`${props.albums} ${props.albums > 0 ? 'Albums' : 'Album'}`}</p>
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

export default ArtistRow;
