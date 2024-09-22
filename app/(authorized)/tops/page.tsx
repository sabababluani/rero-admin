'use client';

import { useState, useEffect } from 'react';
import TopPageRow from '@/app/Components/TopPageRow/TopPageRow';
import BaseApi from '@/app/api/BaseApi';
import styles from './page.module.scss';

const Tops = () => {
  const [topChartsCount, setTopChartsCount] = useState(0);
  const [topHitsCount, setTopHitsCount] = useState(0);

  useEffect(() => {
    BaseApi.get('/listeners').then((response) => {
      setTopChartsCount(response.data.length);
    });

    BaseApi.get('/music').then((response) => {
      setTopHitsCount(response.data.length);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>TOPS</h1>
      <div className={styles.container}>
        <TopPageRow
          page={'Top Hits'}
          count={topHitsCount}
          pageCount={'Hits'}
          link="/tops/tophits"
        />
        <TopPageRow
          page={'Top Charts'}
          count={topChartsCount}
          pageCount={'Charts'}
          link="/tops/topcharts"
        />
      </div>
    </div>
  );
};

export default Tops;
