import { MusicsPropsInterface } from './musics-props.interfaces';

export interface UserPlaylistPropsInterface {
  id: number;
  name: string;
  musics: MusicsPropsInterface[];
  onDelete: (id: number) => void;
}
