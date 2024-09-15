export interface AlbumPropsInterface {
  id: number;
  cover: string;
  album: string;
  artistName: string;
  songCount: number;
  onDelete: (id: number) => void;
}
