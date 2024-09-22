import Link from 'next/link';
import styles from './TopPageRow.module.scss';
import { TopPageRowPropsInterface } from './interfaces/top-page-row-props.interfaces';

const TopPageRow = (props: TopPageRowPropsInterface) => {
  return (
    <Link href={props.link}>
      <div className={styles.wrapper}>
        <span>{props.page}</span>
        <p>
          {props.count} {props.pageCount}
        </p>
      </div>
    </Link>
  );
};

export default TopPageRow;
