import Button from '../Button/Button';
import styles from './SurePopUp.module.scss';
import { SurePopUpPropsInterface } from './interfaces/sure-pop-props.interface';

const SurePopup = (props: SurePopUpPropsInterface) => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <h2>Are you sure?</h2>
        <div className={styles.container}>
          <div className={styles.nobutton}>
            <Button title="No" onClick={props.onCancel} confirm />
          </div>
          <div className={styles.button}>
            <Button title="Yes" onClick={props.onConfirm} confirm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurePopup;
