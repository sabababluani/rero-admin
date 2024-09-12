import { useState } from 'react';
import styles from './MusicRow.module.scss';
import Image from 'next/image';
import SelectPlaylistPopUp from '../SelectPopUp/SelectPopUp';
import SelectTop from '../SelectTop/SelectTop';
import SurePopup from '../SurePopUp/SurePopUp';
import { MusicRowPropsInterface } from './interfaces/music-row-props.inteface';

const MusicRow = (props: MusicRowPropsInterface) => {
  const [starActive, setStarActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [musicDelete, setMusicDelete] = useState(false);

  const onClickStar = () => {
    setStarActive(true);
  };

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
          <div className={styles.plus} onClick={() => setOpen(true)}>
            <Image src={'/plus.png'} alt="plus" height={22} width={22} />
          </div>
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
      {open && <SelectPlaylistPopUp option={open} setOpen={setOpen} />}
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

export default MusicRow;
