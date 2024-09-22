import SurePopup from '@/app/Components/SurePopUp/SurePopUp';
import styles from './UserPlaylist.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { UserPlaylistPropsInterface } from './interfaces/user-playlist-props.interface';

const UserPlaylist = (props: UserPlaylistPropsInterface) => {
  const [playlistDelete, setPlaylistDelete] = useState(false);

  const onHandleDeleteConfirm = () => {
    setPlaylistDelete(false);
    props.onDelete(props.id);
  };

  return (
    <div className={styles.wrapper}>
      <p>{props.name}</p>
      {/* <p>{props.musics.length} Songs</p> */}
      <div className={styles.delete} onClick={() => setPlaylistDelete(true)}>
        <Image src="/garbage.png" alt="delete" width={28} height={28} />
      </div>
      {playlistDelete && (
        <SurePopup
          onCancel={() => setPlaylistDelete(false)}
          onConfirm={onHandleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default UserPlaylist;
