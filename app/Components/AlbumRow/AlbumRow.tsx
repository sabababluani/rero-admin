import Image from 'next/image';
import styles from './AlbumRow.module.scss';
import { useState } from 'react';
import SurePopup from '../SurePopUp/SurePopUp';
import SelectTop from '../SelectTop/SelectTop';
import { AlbumPropsInterface } from './interfaces/album-row-props.interface';

const AlbumRow = (props: AlbumPropsInterface) => {
  const [musicDelete, setMusicDelete] = useState(false);
  const [starActive, setStarActive] = useState(false);

  const onHandleDelete = () => {
    setMusicDelete(true);
  };

  const onHandleDeleteConfirm = () => {
    setMusicDelete(false);
    props.onDelete(props.id);
  };

  const onClickStar = () => {
    setStarActive(true);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Image src={props.cover} alt="artist cover" width={60} height={60} />
          <p>{props.album}</p>
        </div>
        <div>
          <p>${props.artistName}</p>
        </div>
        <div className={styles.actionContainer}>
          <div
            className={styles.songs}
          >{`${props.songCount} ${props.songCount > 0 ? 'Songs' : 'Song'}`}</div>
          <div className={styles.star}>
            <Image
              src={starActive ? '/fullstar.png' : '/star.png'}
              alt="star"
              width={22}
              height={22}
              onClick={onClickStar}
            />
          </div>
          <div className={styles.garbageSpan} onClick={onHandleDelete}>
            <Image src={'/garbage.png'} alt="trash" width={22} height={22} />
          </div>
        </div>
      </div>
      {starActive && (
        <SelectTop active={starActive} setActive={setStarActive} />
      )}
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
