'use client';

import { useState, useEffect } from 'react';
import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import AlbumRow from '@/app/Components/AlbumRow/AlbumRow';
import BaseApi from '@/app/api/BaseApi'; // Make sure BaseApi is correctly set up for your backend
import { AlbumPagePropsInterface } from '@/app/Components/AlbumRow/interfaces/album-row-props.interface';

const TopAlbums = () => {
  const [albums, setAlbums] = useState<AlbumPagePropsInterface[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<AlbumPagePropsInterface[]>([]);

  // Fetch the albums data from the backend
  useEffect(() => {
    BaseApi.get('/albums') // Adjust the endpoint to match your backend API
      .then((response) => {
        setAlbums(response.data);
        setFilteredAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  const handleDelete = (id: number) => {
    BaseApi.delete(`/albums/${id}`) // Adjust the endpoint to match your backend API
      .then(() => {
        setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
        setFilteredAlbums((prevFilteredAlbums) =>
          prevFilteredAlbums.filter((album) => album.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting album:', error);
      });
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    BaseApi.get(`/albums/search?query=${lowercasedValue}`) 
      .then((response) => {
        setFilteredAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error searching albums:', error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <div className={styles.container}>
          <h1>Top Albums</h1>
          <Search
            placeholder="Search albums..."
            onSearch={handleSearch}
            results={filteredAlbums.map((album) => album.artist?.artistName || '')}
          />
        </div>
      </div>
      <div className={styles.containerWrapper}>
        {filteredAlbums.map((album) => (
          <AlbumRow
            key={album.id}
            id={album.id}
            albumCover={album.musics[0]?.coverImage ?? '/placeholder.png'} 
            artistName={album.artist?.artistName || 'Unknown Artist'}
            name={album.name}
            songCount={album.musics.length}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TopAlbums;
