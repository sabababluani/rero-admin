import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import styles from './PasswordChangePopUp.module.scss';
import { PasswordChangePopUpPropsInterface } from './interfaces/password-change-pop-up-props.interface';

const PasswordChangePopUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangePopUpPropsInterface>();

  const onSubmit = (data: PasswordChangePopUpPropsInterface) => {
    console.log('Password change ', data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputContainer}>
            <p>Current Password</p>
            <input
              type="password"
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
          </div>
          <div className={styles.inputContainer}>
            <p>New Password</p>
            <input
              type="password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>
          <div className={styles.inputContainer}>
            <p>Confirm New Password</p>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value, { newPassword }) =>
                  value === newPassword || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancel}>Cancel</button>
            <button type="submit" className={styles.confirm}>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangePopUp;
