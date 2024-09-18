'use client';

import { useState, useEffect } from 'react';
import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import ArtistRow from '@/app/Components/ArtistRow/ArtistRow';
import BaseApi from '@/app/api/BaseApi';
import { ArtistPagePropsInterface } from './interface/artist-page-props.interface';

const Artist = () => {
  const [artists, setArtists] = useState<ArtistPagePropsInterface[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<ArtistPagePropsInterface[]>([]);

  useEffect(() => {
    BaseApi.get('/artist')
      .then((response) => {
        setArtists(response.data);
        setFilteredArtists(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id: number) => {
    BaseApi.delete(`/artist/${id}`)
      .then(() => {
        setArtists((prevArtists) =>
          prevArtists.filter((artist) => artist.id !== id),
        );
        setFilteredArtists((prevFilteredArtists) =>
          prevFilteredArtists.filter((artist) => artist.id !== id),
        );
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    BaseApi.get(`/search?query=${lowercasedValue}`)
      .then((response) => {
        setFilteredArtists(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <h1>All Artists</h1>
          <Search
            placeholder="Search artists..."
            onSearch={handleSearch}
            results={filteredArtists.map((artist) => artist.artistName)}
          />
        </div>
        <AddNewItem href="/artists/artistadd" />
      </div>
      <div className={styles.artists}>
        {filteredArtists.map((artist) => (
          <ArtistRow
            key={artist.id}
            id={artist.id}
            cover={artist.artistPhoto}
            artistName={artist.artistName}
            albums={artist.albums.length}
            songCount={artist.musics.length}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Artist;
