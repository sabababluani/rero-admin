import { useState } from 'react';
import Button from '../Button/Button';
import styles from './SelectTop.module.scss';
import { SelectTopPropsInterface } from './interfaces/select-top-props.interfaces';

const SelectTop = (props: SelectTopPropsInterface) => {
  const [value, setValue] = useState('Top Charts');

  const onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const handleConfirmClick = () => {
    if (value) {
      console.log(`value: ${value}`);
      props.setActive(false);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <h2>Select Top</h2>
          <select value={value} onChange={onChangeValue}>
            <option value="Top Charts">Top Charts</option>
            <option value="Top Hits">Top Hits</option>
          </select>
        </div>
        <div className={styles.buttonContainer}>
          <Button title="Cancel" onClick={() => props.setActive(false)} />
          <Button title="Confirm" onClick={handleConfirmClick} />
        </div>
      </div>
    </div>
  );
};

export default SelectTop;
