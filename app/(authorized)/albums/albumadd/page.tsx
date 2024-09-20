'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import styles from './page.module.scss';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import BaseApi from '@/app/api/BaseApi';
import { AlbumCreatePropsInterface } from './interfaces/album-create-props.interface';

const AlbumAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlbumCreatePropsInterface>();

  const [selectedCoverImage, setSelectedCoverImage] =
    useState<string>('/uplode.png');

  const validateImageType = (file: File) => {
    const allowedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/jpg',
    ];
    return allowedImageTypes.includes(file.type);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && validateImageType(e.target.files[0])) {
      setSelectedCoverImage(URL.createObjectURL(e.target.files[0]));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const onSubmit = async (values: AlbumCreatePropsInterface) => {
    console.log(values);

    const formData = new FormData();
    formData.append('albumName', values.name);

    if (values.cover[0]) {
      formData.append('coverImage', values.cover[0]);
    }

    try {
      const response = await BaseApi.post('/album', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <h1>{'All Albums > Add New Album'}</h1>
          <AddNewItem href="" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.containerWrapper}
        >
          <div className={styles.formContainer}>
            <div className={styles.form}>
              <div className={styles.inputsContainer}>
                <div className={styles.coverContainer}>
                  <p>Upload Cover Image</p>
                  <label htmlFor="coverImage">
                    <Image
                      src={selectedCoverImage}
                      alt="Upload Cover"
                      width={496}
                      height={220}
                      style={{ cursor: 'pointer' }}
                    />
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    {...register('cover', {
                      required: 'Cover image is required',
                    })}
                    onChange={handleCoverImageChange}
                    style={{ display: 'none' }}
                  />
                  {errors.cover?.message && (
                    <span>{String(errors.cover.message)}</span>
                  )}
                </div>
              </div>
              <div className={styles.inputContainer}>
                <p>Album Name</p>
                <input
                  type="text"
                  placeholder="Enter album name"
                  {...register('name', {
                    required: 'Album name is required',
                  })}
                />
                {errors.name?.message && (
                  <span>{String(errors.name.message)}</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlbumAdd;
