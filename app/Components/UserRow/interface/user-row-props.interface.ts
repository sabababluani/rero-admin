export interface UserRowPropsInterface {
  id: number;
  email: string;
  banned: boolean;
  onDelete: (id: number) => void;
  onBlock: (id: number) => void;
}
