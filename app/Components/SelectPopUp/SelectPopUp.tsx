import { useState, useEffect } from 'react';
import styles from './SelectPopUp.module.scss';
import { SelectPopupPropsInterface } from './interfaces/select-popup-props.interface';
import { albumsSelectPupUpDummy } from './albums-dummy/albums-dummy-data';
import Button from '../Button/Button';

const SelectPlaylistPopUp = (props: SelectPopupPropsInterface) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const handleConfirmClick = () => {
    if (value) {
      console.log(`value: ${value}`);
      props.setOpen(false);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.captionAndSelectWrapper}>
          <span className={styles.captionStyle}>Select Playlist</span>
          <div className={styles.selectStyleWrapper}>
            <select
              className={styles.selectStyle}
              value={value}
              onChange={onChangeValue}
            >
              {albumsSelectPupUpDummy.map((item) => (
                <option
                  key={item.id}
                  className={styles.optionStyle}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button title="Cancel" onClick={() => props.setOpen(false)} />
          <Button
            title="Confirm"
            disabled={!value}
            onClick={handleConfirmClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPlaylistPopUp;
