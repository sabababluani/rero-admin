'use client';

import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import styles from './page.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import BaseApi from '@/app/api/BaseApi';
import { FormInputsPropsInterface } from './interfaces/form-inputs-props.interface';
import { AlbumPagePropsInterface } from '@/app/Components/AlbumRow/interfaces/album-row-props.interface';

const MusicAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsPropsInterface>();

  const [albums, setAlbums] = useState<AlbumPagePropsInterface[]>([]);
  const [artists, setArtists] = useState<AlbumPagePropsInterface[]>([]);
  const [selectedMusicFile, setSelectedMusicFile] = useState<string>('');
  const [selectedCoverImage, setSelectedCoverImage] =
    useState<string>('/uplode.png');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await BaseApi.get('/album');
        setAlbums(albumResponse.data);

        const artistResponse = await BaseApi.get('/artist');
        setArtists(artistResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (values: FormInputsPropsInterface) => {
    const data = new FormData();
    data.append('name', values.name);
    data.append('albumId', values.albumId.toString());
    data.append('artistId', values.artistId.toString());
    data.append('musicAudio', values.musicAudio[0]);
    data.append('coverImage', values.coverImage[0]);


    console.log(values);
    
    BaseApi.post('/music', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
              {errors.name?.message && (
                <span>{String(errors.name.message)}</span>
              )}
            </div>
            <div className={styles.inputContainer}>
              <p>Upload Music</p>
              <div className={styles.uploadInputWrapper}>
                <input
                  type="text"
                  value={selectedMusicFile}
                  readOnly
                  placeholder="Choose a music file"
                />
                <input
                  type="file"
                  {...register('musicAudio', {
                    required: 'Music file is required',
                  })}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedMusicFile(e.target.files[0].name);
                    }
                  }}
                />
              </div>
              {errors.file?.message && (
                <span>{String(errors.file.message)}</span>
              )}
            </div>
          </div>
          <div className={styles.coverContainer}>
            <p>Upload Cover Image</p>
            <Image
              src={selectedCoverImage}
              alt="upload"
              width={496}
              height={240}
            />
            <input
              type="file"
              {...register('coverImage', {
                required: 'Cover image is required',
              })}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setSelectedCoverImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
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
            <option>Select an album</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.name}
              </option>
            ))}
          </select>
          {errors.albumId?.message && (
            <span>{String(errors.albumId.message)}</span>
          )}
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
          {errors.artistId?.message && (
            <span>{String(errors.artistId.message)}</span>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default MusicAdd;
