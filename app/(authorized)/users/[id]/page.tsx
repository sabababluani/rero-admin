'use client';

import { useState } from 'react';
import { UserPropsInterface } from './interfaces/user-props.interface';
import styles from './page.module.scss';
import Image from 'next/image';
import SurePopup from '@/app/Components/SurePopUp/SurePopUp';
import { useParams } from 'next/navigation';
import UserPlaylist from './components/UserPlaylist/UserPlaylist';

const userData = [
  {
    id: 1,
    email: 'user1',
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
            name: 'string',
            musicAudio: 'string',
            coverImage: 'string',
            duration: 'string',
            artistId: 'string',
          },
          {
            id: 2,
            name: 'string',
            musicAudio: 'string',
            coverImage: 'string',
            duration: 'string',
            artistId: 'string',
          },
        ],
      },
      {
        id: 2,
        name: 'Playlist 2',
        musics: [
          {
            id: 1,
            name: 'string',
            musicAudio: 'string',
            coverImage: 'string',
            duration: 'string',
            artistId: 'string',
          },
          {
            id: 2,
            name: 'string',
            musicAudio: 'string',
            coverImage: 'string',
            duration: 'string',
            artistId: 'string',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    email: 'user2',
    playlistCount: 2,
    songCount: 12,
    isBlocked: false,
    password: 'zdzdzdzddz',
    playlists: [
      {
        id: 1,
        name: 'Playlist A',
        musics: [
          {
            id: 1,
            name: 'string',
            musicAudio: 'string',
            coverImage: 'string',
            duration: 'string',
            artistId: 'string',
          },
          {
            id: 2,
            name: 'string',
            musicAudio: 'string',
            coverImage: 'string',
            duration: 'string',
            artistId: 'string',
          },
        ],
      },
      {
        id: 2,
        name: 'Playlist B',
        musics: [
          {
            id: 1,
            name: 'string',
            musicAudio: 'string',
            coverImage: 'string',
            duration: 'string',
            artistId: 'string',
          },
          {
            id: 2,
            name: 'string',
            musicAudio: 'string',
            coverImage: 'string',
            duration: 'string',
            artistId: 'string',
          },
        ],
      },
    ],
  },
];

const User = (props: UserPropsInterface) => {
  const { id } = useParams();

  const userParam = userData.find((user) => user.id === +id);
  if (!userParam) return null;

  const [userDelete, setUserDelete] = useState(false);
  const [userBlock, setUserBlock] = useState(false);
  const [playlistDelete, setPlaylistDelete] = useState(userParam.playlists);

  const onHandleDeleteConfirm = () => {
    setUserDelete(false);
    props.onDelete(userParam.id);
  };

  const onHandleBlockConfirm = () => {
    setUserBlock(false);
    props.onBlock(userParam.id);
  };

  const handleDelete = (playlistId: number) => {
    setPlaylistDelete((prevPlaylist) =>
      prevPlaylist.filter((playlist) => playlist.id !== playlistId),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1>{`All user > ${userParam.email}`}</h1>
      <div className={styles.container}>
        <div>
          <p>{userParam.email}</p>
          <div className={styles.password}>
            <p>{userParam.password}</p>
            <Image src="/Pen.png" alt="pen" width={24} height={24} />
          </div>
          <div className={styles.iconsContainer}>
            <div
              className={
                userParam.isBlocked ? styles.highlightedBlock : styles.block
              }
              onClick={() => setUserBlock(true)}
            >
              <Image src="/block.png" alt="block" width={28} height={28} />
            </div>
            <div className={styles.delete} onClick={() => setUserDelete(true)}>
              <Image src="/garbage.png" alt="delete" width={28} height={28} />
            </div>
          </div>
        </div>
        <div>
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
      {userBlock && (
        <SurePopup
          onCancel={() => setUserBlock(false)}
          onConfirm={onHandleBlockConfirm}
        />
      )}
      {userDelete && (
        <SurePopup
          onCancel={() => setUserDelete(false)}
          onConfirm={onHandleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default User;
