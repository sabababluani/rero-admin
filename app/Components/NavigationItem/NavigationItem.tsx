import Link from 'next/link';
import styles from './NavigationItem.module.scss';
import { NavigationItemPropsInterface } from './interfaces/navigation-item-props.interface';

const NavigationItem = (props: NavigationItemPropsInterface) => {
  return (
    <Link href={props.link} onClick={props.onClick}>
      <div className={`${styles.container} ${props.isActive && styles.active}`}>
        {props.title}
      </div>
    </Link>
  );
};

export default NavigationItem;
