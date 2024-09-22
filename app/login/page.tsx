'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BaseApi from '../api/BaseApi';
import styles from './page.module.scss';
import { LoginPropsInterface } from './interfaces/login-props.interface';
import { setCookie } from '../Helpers/cookies';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginPropsInterface>();

  const email = watch('email');
  const password = watch('password');

  const onSubmit = (data: LoginPropsInterface) => {
    if (rememberMe) {
      localStorage.setItem('email', data.email);
      localStorage.setItem('password', data.password);
    }

    BaseApi.post('/auth/login/admin', data)
      .then((response) => {
        setCookie('token', response.data.accessToken, 60);
        router.push('/');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (savedEmail) {
      setValue('email', savedEmail);
    }

    if (savedPassword) {
      setValue('password', savedPassword);
    }
  }, [setValue]);

  const isSubmitDisabled = !email || !password;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.fullscreenContainer}>
        <div className={styles.loginHeader}>
          <Image src="/favicon.png" alt="logo" width={100} height={100} />
          <p>Log In</p>
        </div>
        <form className={styles.loginInfo} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.loginInputs}>
            <div className={styles.inputContainer}>
              <p>Email</p>
              <input
                type="text"
                placeholder="Email"
                className={errors.email ? styles.erroredInput : styles.input}
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
              />
              {errors.email && (
                <div className={styles.errorDiv}>
                  <Image
                    src={'/error.webp'}
                    alt="error"
                    width={14}
                    height={14}
                  />
                  <div>
                    <span className={styles.errors}>
                      {errors.email.message}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.inputContainer}>
              <p>Password</p>
              <input
                type="password"
                className={errors.password ? styles.erroredInput : styles.input}
                placeholder="Password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  minLength: {
                    value: 8,
                    message: 'Password min length is 8 characters',
                  },
                })}
              />
              {errors.password && (
                <div className={styles.errorDiv}>
                  <Image
                    src={'/error.webp'}
                    alt="error"
                    width={14}
                    height={14}
                  />
                  <div>
                    <span className={styles.errors}>
                      {errors.password.message}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.loginAccess}>
            <div className={styles.remembermeContainer}>
              <div className={styles.rememberme}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
                <p>Remember Me</p>
              </div>
            </div>
            <input
              type="submit"
              value="Log in"
              disabled={isSubmitDisabled}
              className={isSubmitDisabled ? styles.submition : styles.submit}
            />
          </div>
        </form>
      </div>
      <div className={styles.characterBg}>
        <Image
          src="/rerobg.png"
          width={900}
          height={1080}
          alt="rerobg"
          className={styles.rero}
        />
      </div>
    </div>
  );
};

export default Login;
