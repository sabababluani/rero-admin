'use client';

import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import ArtistRow from '@/app/Components/ArtistRow/ArtistRow';
import { useState } from 'react';
import { artistData } from '../../artists/artistDummyData/artist-dummy-data';

const TopArtists = () => {
  const [artists, setArtists] = useState(artistData);
  const [filteredArtists, setFilteredArtists] = useState(artistData);

  const handleDelete = (id: number) => {
    setArtists((prevArtists) => prevArtists.filter((artist) => artist.id !== id));
    setFilteredArtists((prevFilteredArtists) =>
      prevFilteredArtists.filter((artist) => artist.id !== id)
    );
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    const results = artistData.filter((artist) =>
      artist.artistName.toLowerCase().includes(lowercasedValue)
    );
    setFilteredArtists(results);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Top Artists</h1>
      <Search
        placeholder="Search top artists..."
        onSearch={handleSearch}
        results={filteredArtists.map((artist) => artist.artistName)}
      />
      <div className={styles.container}>
        {filteredArtists.map((item) => (
          <ArtistRow
            key={item.id}
            id={item.id}
            cover={item.cover}
            artistName={item.artistName}
            albums={item.albums}
            songCount={item.songCount}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
