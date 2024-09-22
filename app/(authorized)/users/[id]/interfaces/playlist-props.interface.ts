export interface PlaylistInterface {
  id: number;
  playlistName: string;
  musics: any[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface    UserPropsInterface {
  id: number;
  email: string;
  password: string;
  banned: boolean;
  role: string;
  playlists: PlaylistInterface[];
}
