import { RowMusicDataInterface, RowMusicDataPropsInterfaceArray } from '@/app/(authorized)/musicadd/interfaces/row-music-props.interface';
import { MusicsPropsInterface } from '../components/UserPlaylist/interfaces/musics-props.interfaces';

export interface UserPropsInterface {
  id: number;
  email: string;
  password: string;
  isBlocked: boolean;
  onDelete: (id: number) => void;
  onBlock: (id: number) => void;
  playlists?: RowMusicDataInterface[];
  musics: MusicsPropsInterface[];
}
