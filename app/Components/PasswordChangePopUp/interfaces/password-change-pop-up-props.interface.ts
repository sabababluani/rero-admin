export interface PasswordChangePopUpPropsInterface {
  id: number | null;
  newPassword: string;
  confirmPassword: string;
  setClose: (value: boolean) => void;
}
