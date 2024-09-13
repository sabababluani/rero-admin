'use client';

import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import ArtistRow from '@/app/Components/ArtistRow/ArtistRow';
import { useState } from 'react';
import { artistData } from '../../artists/artistDummyData/artist-dummy-data';

const TopArtists = () => {
  const [artists, setArtists] = useState(artistData);

  const handleDelete = (id: number) => {
    setArtists((prevSongs) => prevSongs.filter((song) => song.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <h1>Top Artists</h1>
      <Search />
      <div className={styles.container}>
        {artists.map((item) => (
          <ArtistRow
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
