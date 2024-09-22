import { MusicsPropsInterface } from './musics-props.interfaces';

export interface UserPlaylistPropsInterface {
  id: number;
  name: string;
  onDelete: (id: number) => void;
}
