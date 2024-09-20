import { FieldValues } from 'react-hook-form';

export interface FormInputsPropsInterface {
  name: string;
  artistName: string;
  musicAudio: any;
  albumId: number;
  artistId: number;
  coverImage: any;
  onSubmit: (data: FieldValues) => void;
}
