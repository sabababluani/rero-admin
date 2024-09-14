'use client';

import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import ArtistRow from '@/app/Components/ArtistRow/ArtistRow';
import { useState } from 'react';
import { artistData } from './artistDummyData/artist-dummy-data';

const Artist = () => {
  const [artist, setArtist] = useState(artistData);
  const [filteredArtists, setFilteredArtists] = useState(artistData);

  const handleDelete = (id: number) => {
    setArtist((prevArtist) => prevArtist.filter((artist) => artist.id !== id));
    setFilteredArtists((prevArtists) =>
      prevArtists.filter((artist) => artist.id !== id),
    );
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    const results = artistData.filter((artist) =>
      artist.artistName.toLowerCase().includes(lowercasedValue),
    );
    setFilteredArtists(results);
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
            cover={artist.cover}
            artistName={artist.artistName}
            albums={artist.albums}
            songCount={artist.songCount}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Artist;
