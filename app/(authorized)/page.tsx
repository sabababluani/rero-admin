'use client';

import { useState, useEffect } from 'react';
import Search from '@/app/Components/Search/Search';
import styles from './page.module.css';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import MusicRow from '@/app/Components/MusicRow/MusicRow';
import BaseApi from '@/app/api/BaseApi';
import { MusicPropsInterface } from './artists/interface/artist-page-props.interface';

const Home = () => {
  const [songs, setSongs] = useState<MusicPropsInterface[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<MusicPropsInterface[]>([]);

  useEffect(() => {
    BaseApi.get('/music').then((response) => {
      setSongs(response.data);
      setFilteredSongs(response.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    BaseApi.delete(`/songs/${id}`).then(() => {
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
      setFilteredSongs((prevFilteredSongs) =>
        prevFilteredSongs.filter((song) => song.id !== id),
      );
    });
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    BaseApi.get(`/search?query=${lowercasedValue}`).then((response) => {
      setFilteredSongs(response.data);
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <div>
          <h1>All Songs</h1>
          <Search
            onSearch={handleSearch}
            results={filteredSongs.map((song) => song.name)}
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
            cover={song.coverImage}
            music={song.name}
            album={song.album?.name}
            artistName={song.artist?.artistName}
            duration={song.duration}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
