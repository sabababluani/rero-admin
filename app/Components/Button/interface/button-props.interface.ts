export interface ButtonPropsInterface {
  title: string;
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
  confirm?: boolean;
}
