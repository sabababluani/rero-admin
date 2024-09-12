import Image from 'next/image';
import styles from './PlusButton.module.scss';
import { useState } from 'react';
import SelectPlaylistPopUp from '@/app/Components/SelectPopUp/SelectPopUp';

const PlusButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.plus} onClick={() => setOpen(true)}>
        <Image src={'/plus.png'} alt="plus" height={22} width={22} />
      </div>
      {open && <SelectPlaylistPopUp option={open} setOpen={setOpen} />}
    </>
  );
};

export default PlusButton;
