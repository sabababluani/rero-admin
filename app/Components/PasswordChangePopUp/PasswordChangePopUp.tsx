import { useForm } from 'react-hook-form';
import styles from './PasswordChangePopUp.module.scss';
import { PasswordChangePopUpPropsInterface } from './interfaces/password-change-pop-up-props.interface';
import BaseApi from '@/app/api/BaseApi';

const PasswordChangePopUp = (props: PasswordChangePopUpPropsInterface) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangePopUpPropsInterface>();

  const onSubmit = (data: PasswordChangePopUpPropsInterface) => {
    if (data.confirmPassword !== data.password) return null;
    const payload = {
      password: data.password,
    };


    BaseApi.put(`/user/${props.id}/change-password`, payload)
      .then(() => {
        alert('Password changed successfully');
      })
      .catch(() => {
        alert('Could not change password');
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputContainer}>
            <p>New Password</p>
            <input
              type="password"
              {...register('password', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className={styles.inputContainer}>
            <p>Confirm New Password</p>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value, { password }) =>
                  value === password || 'Passwords do not match',
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
