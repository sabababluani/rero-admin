'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import Search from '@/app/Components/Search/Search';
import MusicRow from '@/app/Components/MusicRow/MusicRow';
import BaseApi from '@/app/api/BaseApi';
import { MusicPropsInterface } from '../../artists/interface/artist-page-props.interface';

export const getChartsLength = (songs: MusicPropsInterface[]) => {
  return songs.length;
};

const TopCharts = () => {
  const [songs, setSongs] = useState<MusicPropsInterface[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<MusicPropsInterface[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await BaseApi.get('/listeners');
        setSongs(response.data);
        setFilteredSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await BaseApi.delete(`/music/${id}`);
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
      setFilteredSongs((prevFilteredSongs) =>
        prevFilteredSongs.filter((song) => song.id !== id),
      );
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const handleSearch = async (value: string) => {
    if (value.trim() === '') {
      setFilteredSongs(songs);
      return;
    }

    const lowercasedValue = value.toLowerCase();
    try {
      const response = await BaseApi.get(`/search?query=${lowercasedValue}`);
      setFilteredSongs(response.data.musics || []);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
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

export default TopCharts;
