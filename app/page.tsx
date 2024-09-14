'use client';

import { useState } from 'react';
import AddNewItem from './Components/AddNewItem/AddNewItem';
import MusicRow from './Components/MusicRow/MusicRow';
import Search from './Components/Search/Search';
import styles from './page.module.css';
import { songData } from './utils/SongData';

export default function Home() {
  const [songs, setSongs] = useState(songData);
  const [filteredSongs, setFilteredSongs] = useState(songData);

  const handleDelete = (id: number) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    const results = songs.filter(song =>
      song.music.toLowerCase().includes(lowercasedValue) ||
      song.artistName.toLowerCase().includes(lowercasedValue)
    );
    setFilteredSongs(results);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <div>
          <h1>All Songs</h1>
          <Search
            onSearch={handleSearch}
            results={filteredSongs.map(song => song.music)}
          />
        </div>
        <div>
          <AddNewItem href="/musicadd" />
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
}
