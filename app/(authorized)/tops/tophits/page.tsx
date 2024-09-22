'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import Search from '@/app/Components/Search/Search';
import MusicRow from '@/app/Components/MusicRow/MusicRow';
import BaseApi from '@/app/api/BaseApi';
import { MusicPropsInterface } from '../../artists/interface/artist-page-props.interface';

const TopHits = () => {
  const [songs, setSongs] = useState<MusicPropsInterface[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<MusicPropsInterface[]>([]);

  useEffect(() => {
    BaseApi.get('/music')
      .then((response) => {
        setSongs(response.data);
        setFilteredSongs(response.data);
      })
      .catch(() => {
        alert('Could not fetch data');
      });
  }, []);

  const handleDelete = (id: number) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
    setFilteredSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    const results = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(lowercasedValue) ||
        song.artist.artistName.toLowerCase().includes(lowercasedValue),
    );
    setFilteredSongs(results);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <div>
          <h1>Top Charts</h1>
          <Search
            onSearch={handleSearch}
            results={filteredSongs.map((song) => song.name)}
          />
        </div>
      </div>
      <div className={styles.container}>
        {filteredSongs.map((song) => (
          <MusicRow
            key={song.id}
            id={song.id}
            cover={song.coverImage}
            music={song.name}
            album={song.album?.name}
            artistName={song.artist.artistName}
            duration={song.duration}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TopHits;
