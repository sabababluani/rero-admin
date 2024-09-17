'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import { songData } from '@/app/utils/SongData';
import Search from '@/app/Components/Search/Search';
import MusicRow from '@/app/Components/MusicRow/MusicRow';

const TopHits = () => {
  const [songs, setSongs] = useState(songData);
  const [filteredSongs, setFilteredSongs] = useState(songData);

  const handleDelete = (id: number) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
    setFilteredSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    const results = songs.filter(
      (song) =>
        song.music.toLowerCase().includes(lowercasedValue) ||
        song.artistName.toLowerCase().includes(lowercasedValue),
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
            results={filteredSongs.map((song) => song.music)}
          />
        </div>
      </div>
      <div className={styles.container}>
        {filteredSongs.map((song) => (
          <MusicRow
            key={song.id}
            id={song.id}
            cover={song.cover}
            music={song.music}
            album={song.album}
            artistName={song.artistName}
            duration={song.duration}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TopHits;