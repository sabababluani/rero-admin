import { RowMusicDataInterface } from '../../musicadd/interfaces/row-music-props.interface';

export interface UserPropsInterface {
  id: number;
  email: string;
  banned: boolean;
  playlistCount?: number | undefined;
  songCount?: number;
  playlists: {
    id: number;
    playlistName: string;
    musics: RowMusicDataInterface[];
  }[];
}
