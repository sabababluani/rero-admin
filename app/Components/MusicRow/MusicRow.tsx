'use client';

import { useState } from 'react';
import { MusicRowPropsInterface } from './interfaces/music-row-props.inteface';
import styles from './MusicRow.module.scss';
import Image from 'next/image';

const MusicRow = (props: MusicRowPropsInterface) => {
  const [starActive, setStarActive] = useState(false);

  return (
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
        <div className={styles.plus}>
          <Image src={'/plus.png'} alt="plus" height={22} width={22} />
        </div>
        <div className={styles.star} onClick={() => setStarActive(!starActive)}>
          <Image
            src={starActive ? '/fullstar.png' : '/star.png'}
            alt="star"
            width={22}
            height={22}
          />
        </div>
        <div className={styles.garbageSpan}>
          <Image src={'/garbage.png'} alt="trash" width={22} height={22} />
        </div>
      </div>
    </div>
  );
};

export default MusicRow;
