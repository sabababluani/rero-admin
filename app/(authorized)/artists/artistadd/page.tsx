'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import BaseApi from '@/app/api/BaseApi';
import styles from './page.module.scss';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import { ArtistCreatePropsInterface } from './interfaces/artist-create-props.interface';

const ArtistAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArtistCreatePropsInterface>();

  const [, setSelectedArtistId] = useState<number | null>(null);
  const [, setSelectedMusicFile] = useState<string>('');
  const [selectedCoverImage, setSelectedCoverImage] =
    useState<string>('/uplode.png');

  const validateImageType = (file: File) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedImageTypes.includes(file.type);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && validateImageType(e.target.files[0])) {
      setSelectedCoverImage(URL.createObjectURL(e.target.files[0]));
    } else {
      alert('Please upload a valid image file (jpeg, png, or gif).');
    }
  };

  const onSubmit = async (values: ArtistCreatePropsInterface) => {
    const formData = new FormData();
    formData.append('artistName', values.artistName);
    formData.append('biography', values.biography);

    if (values.artistPhoto[0]) {
      formData.append('artistPhoto', values.artistPhoto[0]);
    }

    reset();
    setSelectedMusicFile('');
    setSelectedCoverImage('/uplode.png');
    setSelectedArtistId(null);

    try {
      const response = await BaseApi.post('/artist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Artist added successfully!');
    } catch (error) {
      alert('Could not add artist.');
    }
  };

  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.container}>
        <h1>{'All Artists > Add New Artist'}</h1>
        <AddNewItem href="" />
      </div>
      <div className={styles.wrapper}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.form}>
            <div className={styles.inputsContainer}>
              <div className={styles.inputContainer}>
                <p>Artist Name</p>
                <input
                  type="text"
                  placeholder="Enter artist name"
                  {...register('artistName', {
                    required: 'Artist name is required',
                  })}
                />
                {errors.artistName?.message && (
                  <span>{String(errors.artistName.message)}</span>
                )}
              </div>
              <div className={styles.textareaContainer}>
                <p>Artist Biography</p>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder="Enter artist biography"
                  {...register('biography', {
                    required: 'Artist biography is required',
                  })}
                />
                {errors.biography?.message && (
                  <span>{String(errors.biography.message)}</span>
                )}
              </div>
            </div>
            <div className={styles.coverContainer}>
              <p>Upload Cover Image</p>
              <label htmlFor="coverImage">
                <Image
                  src={selectedCoverImage || '/uplode.png'}
                  alt="Upload Cover"
                  width={496}
                  height={220}
                  style={{ cursor: 'pointer' }}
                />
              </label>
              <input
                type="file"
                id="coverImage"
                {...register('artistPhoto', {
                  required: 'Cover image is required',
                  onChange: handleCoverImageChange,
                })}
                style={{ display: 'none' }}
              />
              {errors.artistPhoto?.message && (
                <span>{String(errors.artistPhoto.message)}</span>
              )}
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

export default ArtistAdd;
