export interface UserPropsInterface {
  id: number;
  email: string;
  password: string;
  isBlocked: boolean;
  onDelete: (id: number) => void;
  onBlock: (id: number) => void;
}
