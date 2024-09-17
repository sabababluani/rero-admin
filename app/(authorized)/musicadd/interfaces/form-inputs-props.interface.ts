import { FieldValues } from 'react-hook-form';

export interface FormInputsPropsInterface {
  name: string;
  artistName: string;
  musicAudio: string;
  albumId: number;
  artistId: number;
  coverImage: string;
  onSubmit: (data: FieldValues) => void;
}
