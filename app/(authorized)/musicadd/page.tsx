'use client';

import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import styles from './page.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import BaseApi from '@/app/api/BaseApi';
import { FormInputsPropsInterface } from './interfaces/form-inputs-props.interface';
import { AlbumPagePropsInterface } from '@/app/Components/AlbumRow/interfaces/album-row-props.interface';

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
  const [albums, setAlbums] = useState<AlbumPagePropsInterface[]>([]);
  const [artists, setArtists] = useState<AlbumPagePropsInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await BaseApi.get('/album');
        setAlbums(albumResponse.data);

        const artistResponse = await BaseApi.get('/artist');
        setArtists(artistResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormInputsPropsInterface> = (data) => {
    if (!selectedMusicFile || !data.albumId || !data.artistId) return;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('musicAudio', selectedMusicFile);
    if (selectedImage) formData.append('coverImage', selectedImage);
    formData.append('albumId', data.albumId.toString());
    formData.append('artistId', data.artistId.toString());
    formData.append('coverImage', selectedImage || '');

    BaseApi.post('/music', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Failed to submit form:', error);
      });
  };

  const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const music = file.name.split('.').pop()?.toLowerCase();
      if (music !== 'mp3') {
        alert('Please upload a valid MP3 music file');
        return;
      }
      setSelectedMusicFile(file);
      setMusicFileName(file.name);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      if (fileType !== 'image') {
        alert('Please upload a valid image file.');
        return;
      }

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
                {...register('name', {
                  required: 'Song title is required',
                })}
                type="text"
                placeholder="Enter song title"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className={styles.inputContainer}>
              <p>Upload Music</p>
              <div className={styles.uploadInputWrapper}>
                <input
                  {...register('musicAudio', {
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
              {errors.musicAudio && <span>{errors.musicAudio.message}</span>}
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

        <div className={styles.inputContainer}>
          <p>Select Album</p>
          <select
            {...register('albumId', {
              required: 'Album selection is required',
            })}
          >
            <option value="">Select an album</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.name}
              </option>
            ))}
          </select>
          {errors.albumId && <span>{errors.albumId.message}</span>}
        </div>

        <div className={styles.inputContainer}>
          <p>Select Artist</p>
          <select
            {...register('artistId', {
              required: 'Artist selection is required',
            })}
          >
            <option>Select an artist</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.artistName}
              </option>
            ))}
          </select>
          {errors.artistId && <span>{errors.artistId.message}</span>}
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default MusicAdd;
