export interface ArtistRowPropsInterface {
  id: number;
  cover: string;
  artistName: string;
  albums: number;
  songCount: number;
  onDelete: (id: number) => void;
}
