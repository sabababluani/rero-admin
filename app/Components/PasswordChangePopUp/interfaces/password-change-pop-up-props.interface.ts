export interface PasswordChangePopUpPropsInterface {
  id: number | null;
  password?: string;
  confirmPassword?: string;
  setClose: (value: boolean) => void;
}
