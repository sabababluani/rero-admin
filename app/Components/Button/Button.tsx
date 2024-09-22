import styles from './Button.module.scss';
import { ButtonPropsInterface } from './interface/button-props.interface';

const Button = (props: ButtonPropsInterface) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.container} ${props.confirm && styles.confrim}`}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default Button;
