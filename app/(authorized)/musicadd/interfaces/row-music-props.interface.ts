export interface RowMusicDataInterface extends RowMusicDataPropsInterfaceArray {
  artistId: number;
  id: number;
  duration: string;
  albumName: string;
  cover: string;
  artistName: string;
  music: string;
  name: string;
  coverImage: string;
}

export interface RowMusicDataPropsInterfaceArray {
  albums: RowMusicDataInterface[];
}
