'use client';

import { useState, useEffect } from 'react';
import TopPageRow from '@/app/Components/TopPageRow/TopPageRow';
import BaseApi from '@/app/api/BaseApi';
import styles from './page.module.scss';

const Tops = () => {
  const [topChartsCount, setTopChartsCount] = useState(0);

  useEffect(() => {
    BaseApi.get('/listeners').then((response) => {
      setTopChartsCount(response.data.length);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>TOPS</h1>
      <div className={styles.container}>
        <TopPageRow
          page={'Top Hits'}
          count={topChartsCount}
          pageCount={'Hits'}
          link="/tops/tophits"
        />
        <TopPageRow
          page={'Top Charts'}
          count={topChartsCount}
          pageCount={'Charts'}
          link="/tops/topcharts"
        />
        <TopPageRow
          page={'Top Albums'}
          count={topChartsCount}
          pageCount={'Albums'}
          link="/tops/topalbums"
        />
        <TopPageRow
          page={'Top Artists'}
          count={topChartsCount}
          pageCount={'Artists'}
          link="/tops/topartists"
        />
      </div>
    </div>
  );
};

export default Tops;
