'use client';

import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import { useState } from 'react';
import { albumDummyData } from './albumdata/album-data';
import AlbumRow from '@/app/Components/AlbumRow/AlbumRow';
import { AlbumPropsInterface } from './interfaces/albums-props-interface';

const Albums = () => {
  const [artists, setArtists] = useState<AlbumPropsInterface[]>(albumDummyData);
  const [filteredAlbums, setFilteredAlbums] =
    useState<AlbumPropsInterface[]>(albumDummyData);

  const handleDelete = (id: number) => {
    setArtists((prevArtists) =>
      prevArtists.filter((artist) => artist.id !== id),
    );
    setFilteredAlbums((prevFilteredAlbums) =>
      prevFilteredAlbums.filter((albums) => albums.id !== id),
    );
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    const results = albumDummyData.filter((album) =>
      album.album.toLowerCase().includes(lowercasedValue),
    );
    setFilteredAlbums(results);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <div className={styles.container}>
          <h1>All Albums</h1>
          <Search
            placeholder="Search artists..."
            onSearch={handleSearch}
            results={filteredAlbums.map((albums) => albums.artistName)}
          />
        </div>
        <AddNewItem href="/albums/albumadd" />
      </div>
      <div className={styles.containerWrapper}>
        {filteredAlbums.map((albums) => (
          <AlbumRow
            key={albums.id}
            id={albums.id}
            cover={albums.cover}
            artistName={albums.artistName}
            album={albums.album}
            songCount={albums.songCount}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Albums;
