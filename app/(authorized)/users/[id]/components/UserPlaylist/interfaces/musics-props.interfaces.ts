import { RowMusicDataInterface } from "@/app/(authorized)/musicadd/interfaces/row-music-props.interface";

export interface MusicsPropsInterface {
  id: number;
  name: string;
  musicAudio: string;
  coverImage: string;
  duration: string;
  artistId: string;
  musics: RowMusicDataInterface[];
}
