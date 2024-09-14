export interface UserRowPropsInterface {
  id: number;
  email: string;
  playlistCount: number;
  songCount: number;
  isBlocked: boolean;
  onDelete: (id: number) => void;
  onBlock: (id: number) => void;
}
