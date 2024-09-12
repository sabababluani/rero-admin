import Image from 'next/image';
import styles from './StarButton.module.scss';
import { useState } from 'react';
import SelectTop from '@/app/Components/SelectTop/SelectTop';

const StarButton = () => {
  const [starActive, setStarActive] = useState(false);

  const onClickStar = () => {
    setStarActive(true);
  };

  return (
    <>
      <div className={styles.star}>
        <Image
          src={starActive ? '/fullstar.png' : '/star.png'}
          alt="star"
          width={22}
          height={22}
          onClick={onClickStar}
        />
      </div>
      {starActive && (
        <SelectTop active={starActive} setActive={setStarActive} />
      )}
    </>
  );
};

export default StarButton;
