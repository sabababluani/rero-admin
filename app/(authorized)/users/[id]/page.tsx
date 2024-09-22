'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import UserPlaylist from './components/UserPlaylist/UserPlaylist';
import PasswordChangePopUp from '@/app/Components/PasswordChangePopUp/PasswordChangePopUp';
import BaseApi from '@/app/api/BaseApi';
import { UserPropsInterface } from './interfaces/playlist-props.interface';

const User = () => {
  const { id } = useParams();
  const [data, setData] = useState<UserPropsInterface | null>(null);
  const [playlists, setPlaylists] = useState<UserPropsInterface['playlists']>(
    [],
  );
  const [passwordChange, setPasswordChange] = useState(false);

  useEffect(() => {
    if (id) {
      BaseApi.get(`/user/${id}`).then((response) => {
        setData(response.data);
        setPlaylists(response.data.playlists || []);
      });
    }
  }, [id]);

  if (!data) return null;

  const handleDelete = (playlistId: number) => {
    BaseApi.delete(`/playlist/${playlistId}`)
      .then(() => {
        alert('Playlist successfully deleted');
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist.id !== playlistId),
        );
      })
      .catch(() => {
        alert('Could not delete playlist');
      });
  };

  return (
    <div className={styles.wrapper}>
      <h1>{`All user > ${data.email}`}</h1>
      <div className={styles.container}>
        <div className={styles.containerWrapper}>
          <p>{data.email}</p>
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
            {playlists.map((playlist) => (
              <UserPlaylist
                key={playlist.id}
                id={playlist.id}
                name={playlist.playlistName}
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
        />
      )}
    </div>
  );
};

export default User;
