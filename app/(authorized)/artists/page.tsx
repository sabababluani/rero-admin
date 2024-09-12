'use client';

import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import ArtistRow from '@/app/Components/ArtistRow/ArtistRow';
import { useState } from 'react';
import { artistData } from './artistDummyData/artist-dummy-data';

const Artist = () => {
  const [artist, setArtist] = useState(artistData);

  const handleDelete = (id: number) => {
    setArtist((prevArtist) => prevArtist.filter((artist) => artist.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <h1>All Artists</h1>
          <Search />
        </div>
        <AddNewItem href='/musicadd'/>
      </div>
      <div className={styles.artists}>
        {artist.map((artist) => (
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
