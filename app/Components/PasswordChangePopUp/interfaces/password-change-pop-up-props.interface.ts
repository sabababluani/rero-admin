export interface PasswordChangePopUpPropsInterface {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  setClose: (value: boolean) => void;
}
