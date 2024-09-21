export interface AlbumPropsInterface {
  id: number;
  albumCover: string;
  name: string;
  artistName: string;
  songCount: number;
  onDelete: (id: number) => void;
}

export interface AlbumPagePropsInterface {
  artistName: string;
  id: number;
  name: string;
  releaseDate: string;
  cover: string;
  musics: {
    id: number;
    name: string;
    musicAudio: string;
    coverImage: string;
    duration: string;
    albumId: number;
    artistId: number;
  }[];
  artist: {
    id: number;
    artistName: string;
    artistPhoto: string;
    biography: string;
  };
}

export interface Albums {
  name: string;
  id: number | null | undefined;
  albums: AlbumPagePropsInterface[];
}