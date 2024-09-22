import { FieldValues } from 'react-hook-form';

export interface FormInputsPropsInterface {
  name: string;
  artistName: string;
  musicAudio: FileList;
  albumId: number;
  artistId: number;
  coverImage: FileList;
  onSubmit: (data: FieldValues) => void;
}
