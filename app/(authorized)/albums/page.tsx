'use client';

import { useState, useEffect } from 'react';
import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import AlbumRow from '@/app/Components/AlbumRow/AlbumRow';
import BaseApi from '@/app/api/BaseApi';
import { AlbumPagePropsInterface } from '@/app/Components/AlbumRow/interfaces/album-row-props.interface';

const Albums = () => {
  const [albums, setAlbums] = useState<AlbumPagePropsInterface[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<
    AlbumPagePropsInterface[]
  >([]);

  useEffect(() => {
    BaseApi.get('/album').then((response) => {
      setAlbums(response.data);
      setFilteredAlbums(response.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    BaseApi.delete(`/album/${id}`).then(() => {
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
      setFilteredAlbums((prevFilteredAlbums) =>
        prevFilteredAlbums.filter((album) => album.id !== id),
      );
    });
  };

  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      setFilteredAlbums(albums);
      return;
    }
    const lowercasedValue = value.toLowerCase();
    BaseApi.get(`/search?query=${lowercasedValue}`).then((response) => {
      setFilteredAlbums(response.data.albums);
    });
  };
console.log(filteredAlbums);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <div className={styles.container}>
          <h1>All Albums</h1>
          <Search
            placeholder="Search albums..."
            onSearch={handleSearch}
            results={filteredAlbums?.map?.((album) => album.artist?.artistName)}
          />
        </div>
        <AddNewItem href="/albums/albumadd" />
      </div>
      <div className={styles.containerWrapper}>
        {filteredAlbums?.map?.((album) => (
          <AlbumRow
            key={album.id}
            id={album.id}
            albumCover={album.cover ?? '/placeholder.png'}
            artistName={album.artist?.artistName}
            songCount={album.musics.length}
            onDelete={handleDelete}
            name={album.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Albums;
