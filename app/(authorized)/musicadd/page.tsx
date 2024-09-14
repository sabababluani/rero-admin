'use client';

import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import styles from './page.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useRef, useState } from 'react';
import axios from 'axios';
import { FormInputsPropsInterface } from './interfaces/form-inputs-props.interface';

const MusicAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsPropsInterface>();

  const musicFileInputRef = useRef<HTMLInputElement | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMusicFile, setSelectedMusicFile] = useState<File | null>(null);
  const [musicFileName, setMusicFileName] = useState('');

  const onSubmit: SubmitHandler<FormInputsPropsInterface> = (data) => {
    if (!selectedMusicFile) return;

    console.log(data);

    const formData = new FormData();
    formData.append('songTitle', data.songTitle);
    formData.append('artistName', data.artistName);
    formData.append('music', selectedMusicFile);
    formData.append('coverImage', selectedImage || '');

    axios
      .post('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const music = file.name.split('.').pop()?.toLowerCase();
      if (music !== 'mp3') {
        alert('Please upload a music file');
        return;
      }
      setSelectedMusicFile(file);
      setMusicFileName(file.name);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicUploadClick = () => {
    if (musicFileInputRef.current) {
      musicFileInputRef.current.click();
    }
  };

  const handleCoverUploadClick = () => {
    if (coverImageInputRef.current) {
      coverImageInputRef.current.click();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>{'All Song > Add Song'}</h1>
        <AddNewItem href="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formContainer}>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainer}>
              <p>Song Title</p>
              <input
                {...register('songTitle', {
                  required: 'Song title is required',
                })}
                type="text"
                placeholder="Enter song title"
              />
              {errors.songTitle && <span>{errors.songTitle.message}</span>}
            </div>
            <div className={styles.inputContainer}>
              <p>Artist Name</p>
              <input
                {...register('artistName', {
                  required: 'Artist name is required',
                })}
                type="text"
                placeholder="Enter artist name"
              />
              {errors.artistName && <span>{errors.artistName.message}</span>}
            </div>
            <div className={styles.inputContainer}>
              <p>Upload Music</p>
              <div className={styles.uploadInputWrapper}>
                <input
                  {...register('music', {
                    required: 'Music file is required',
                  })}
                  type="text"
                  value={musicFileName}
                  placeholder="Choose a file"
                  readOnly
                />
                <button
                  type="button"
                  className={styles.uploadButton}
                  onClick={handleMusicUploadClick}
                >
                  Choose File
                </button>
                <input
                  type="file"
                  ref={musicFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleMusicFileChange}
                />
              </div>
              {errors.music && <span>{errors.music.message}</span>}
            </div>
          </div>
          <div className={styles.coverContainer}>
            <p>Upload Cover Image</p>
            <Image
              src={selectedImage || '/uplode.png'}
              alt="cover"
              width={496}
              height={240}
              onClick={handleCoverUploadClick}
              style={{ cursor: 'pointer' }}
            />
            <input
              type="file"
              ref={coverImageInputRef}
              style={{ display: 'none' }}
              onChange={handleCoverImageChange}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default MusicAdd;
