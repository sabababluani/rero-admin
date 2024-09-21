'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import UserPlaylist from './components/UserPlaylist/UserPlaylist';
import PasswordChangePopUp from '@/app/Components/PasswordChangePopUp/PasswordChangePopUp';
import BaseApi from '@/app/api/BaseApi';
import { UserPropsInterface } from './interfaces/user-props.interface';

const User = () => {
  const [data, setData] = useState<UserPropsInterface[]>([]);

  useEffect(() => {
    BaseApi.get('/user').then((response) => {
      setData(response.data);
    });
  }, []);

  const { id } = useParams();
  const userParam = data.find((user) => user.id === +id);

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
            <p>Change Password</p>
            <div
              className={
                passwordChange
                  ? styles.editActiveContainer
                  : styles.editContainer
              }
            >
              <Image
                src="/Pen.png"
                alt="pen"
                width={24}
                height={24}
                onClick={() => setPasswordChange(true)}
              />
            </div>
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
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
      {passwordChange && (
        <PasswordChangePopUp
          setClose={() => setPasswordChange(false)}
          id={+id}
          newPassword={''}
          confirmPassword={''}
        />
      )}
    </div>
  );
};

export default User;
