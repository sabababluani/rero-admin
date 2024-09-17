'use client';

import TopPageRow from '@/app/Components/TopPageRow/TopPageRow';
import styles from './page.module.scss';

const Tops = () => {
  return (
    <div className={styles.wrapper}>
      <h1>TOPS</h1>
      <div className={styles.container}>
        <TopPageRow page={'Top Hits'} count={25} pageCount={'Hits'} link="/tops/tophits" />
        <TopPageRow
          page={'Top Charts'}
          count={25}
          pageCount={'Charts'}
          link="/tops/topcharts"
        />
        <TopPageRow
          page={'Top Albums'}
          count={25}
          pageCount={'Albums'}
          link="/tops/topalbums"
        />
        <TopPageRow
          page={'Top Artists'}
          count={25}
          pageCount={'Artists'}
          link="/tops/topartists"
        />
      </div>
    </div>
  );
};

export default Tops;
