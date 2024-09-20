'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import UserPlaylist from './components/UserPlaylist/UserPlaylist';
import PasswordChangePopUp from '@/app/Components/PasswordChangePopUp/PasswordChangePopUp';

const userData = [
  {
    id: 1,
    email: 'user1@example.com',
    playlistCount: 5,
    songCount: 20,
    isBlocked: false,
    password: 'zdzdzdzddz',
    playlists: [
      {
        id: 1,
        name: 'Playlist 1',
        musics: [
          {
            id: 1,
            name: 'Song 1',
            musicAudio: 'audio1.mp3',
            coverImage: 'cover1.png',
            duration: '3:45',
            artistId: 'artist1',
          },
          {
            id: 2,
            name: 'Song 2',
            musicAudio: 'audio2.mp3',
            coverImage: 'cover2.png',
            duration: '4:20',
            artistId: 'artist2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    email: 'user2@example.com',
    playlistCount: 2,
    songCount: 12,
    isBlocked: false,
    password: 'abcdefg',
    playlists: [
      {
        id: 1,
        name: 'Playlist A',
        musics: [
          {
            id: 1,
            name: 'Song A1',
            musicAudio: 'audioA1.mp3',
            coverImage: 'coverA1.png',
            duration: '2:50',
            artistId: 'artistA1',
          },
        ],
      },
      {
        id: 2,
        name: 'Playlist A',
        musics: [
          {
            id: 1,
            name: 'Song A1',
            musicAudio: 'audioA1.mp3',
            coverImage: 'coverA1.png',
            duration: '2:50',
            artistId: 'artistA1',
          },
        ],
      },
      {
        id: 3,
        name: 'Playlist A',
        musics: [
          {
            id: 1,
            name: 'Song A1',
            musicAudio: 'audioA1.mp3',
            coverImage: 'coverA1.png',
            duration: '2:50',
            artistId: 'artistA1',
          },
        ],
      },
      {
        id: 4,
        name: 'Playlist A',
        musics: [
          {
            id: 1,
            name: 'Song A1',
            musicAudio: 'audioA1.mp3',
            coverImage: 'coverA1.png',
            duration: '2:50',
            artistId: 'artistA1',
          },
        ],
      },
      {
        id: 5,
        name: 'Playlist A',
        musics: [
          {
            id: 1,
            name: 'Song A1',
            musicAudio: 'audioA1.mp3',
            coverImage: 'coverA1.png',
            duration: '2:50',
            artistId: 'artistA1',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    email: 'user3@example.com',
    playlistCount: 3,
    songCount: 15,
    isBlocked: false,
    password: 'zxcvbnm',
    playlists: [
      {
        id: 1,
        name: 'Playlist X',
        musics: [
          {
            id: 1,
            name: 'Song X1',
            musicAudio: 'audioX1.mp3',
            coverImage: 'coverX1.png',
            duration: '3:30',
            artistId: 'artistX1',
          },
        ],
      },
    ],
  },
];

const User = () => {
  const { id } = useParams();
  const userParam = userData.find((user) => user.id === +id);

  const [playlistDelete, setPlaylistDelete] = useState(
    userParam?.playlists || [],
  );
  const [passwordChange, setPasswordChange] = useState(false);

  if (!userParam) return;

  const handleDelete = (playlistId: number) => {
    setPlaylistDelete((prevPlaylist) =>
      prevPlaylist.filter((playlist) => playlist.id !== playlistId),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1>{`All user > ${userParam.email}`}</h1>
      <div className={styles.container}>
        <div className={styles.containerWrapper}>
          <p>{userParam.email}</p>
          <div className={styles.password}>
            <p>{userParam.password}</p>
            <Image
              src="/Pen.png"
              alt="pen"
              width={24}
              height={24}
              onClick={() => setPasswordChange(true)}
            />
          </div>
        </div>
        <div className={styles.playlistContainer}>
          <h2>User Playlists</h2>
          <div className={styles.mapContainer}>
            {playlistDelete.map((playlist) => (
              <UserPlaylist
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
                musics={playlist.musics}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
      {passwordChange && (
        <PasswordChangePopUp
          setClose={() => setPasswordChange(false)}
          newPassword={''}
          confirmPassword={''}
        />
      )}
    </div>
  );
};

export default User;
