import { useForm } from 'react-hook-form';
import styles from './PasswordChangePopUp.module.scss';
import { PasswordChangePopUpPropsInterface } from './interfaces/password-change-pop-up-props.interface';

const PasswordChangePopUp = (props: PasswordChangePopUpPropsInterface) => {
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
              type="text"
              value={props.currentPassword}
            />
            {errors.currentPassword && (
              <span>{errors.currentPassword.message}</span>
            )}
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
            {errors.newPassword && <span>{errors.newPassword.message}</span>}
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
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => props.setClose(false)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.confirm}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangePopUp;
