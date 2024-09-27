'use client';

import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import styles from './page.module.scss';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import BaseApi from '@/app/api/BaseApi';
import { FormInputsPropsInterface } from './interfaces/form-inputs-props.interface';
import { ArtistPropsInterface } from './interfaces/artist-props.interface';
import { RowMusicDataInterface } from './interfaces/row-music-props.interface';

const MusicAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputsPropsInterface>();

  const [albums, setAlbums] = useState<RowMusicDataInterface[]>([]);
  const [artists, setArtists] = useState<ArtistPropsInterface[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<RowMusicDataInterface[]>(
    [],
  );
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedMusicFile, setSelectedMusicFile] = useState<string>('');
  const [selectedCoverImage, setSelectedCoverImage] =
    useState<string>('/uplode.png');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await BaseApi.get('/artist');
        setArtists(artistResponse.data);

        const allAlbums = artistResponse.data.flatMap(
          (artist: ArtistPropsInterface) => artist.albums,
        );
        setAlbums(allAlbums);
      } catch (error) {
        alert('Could not fetch artists');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedArtistId !== null) {
      const artistAlbums = albums.filter(
        (album) => album.artistId === selectedArtistId,
      );
      setFilteredAlbums(artistAlbums);
    } else {
      setFilteredAlbums([]);
    }
  }, [selectedArtistId, albums]);

  const onSubmit = async (values: FormInputsPropsInterface) => {
    const data = new FormData();
    data.append('name', values.name);
    data.append('albumId', values.albumId.toString());
    data.append('artistId', values.artistId.toString());
    data.append('musicAudio', values.musicAudio[0]);
    data.append('coverImage', values.coverImage[0]);

    reset();
    setSelectedArtistId(null);
    setSelectedMusicFile('');
    setSelectedCoverImage('/uplode.png');
    try {
      await BaseApi.post('/music', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Music added successfully!');
    } catch {
      alert('Failed to add music.');
    }
  };

  const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'audio/mpeg') {
      setSelectedMusicFile(file.name);
    } else {
      alert('Please select a valid .mp3 file.');
      e.target.value = '';
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file && validImageTypes.includes(file.type)) {
      setSelectedCoverImage(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file (.jpg or .png).');
      e.target.value = '';
    }
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArtistId(+e.target.value);
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
                {...register('name', { required: 'Song title is required' })}
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
                <button
                  type="button"
                  onClick={() => document.getElementById('musicAudio')?.click()}
                  className={styles.uploadButton}
                >
                  Select Music
                </button>
                <input
                  type="file"
                  id="musicAudio"
                  {...register('musicAudio', {
                    required: 'Music file is required',
                    onChange: handleMusicFileChange,
                  })}
                  className={styles.inputFile}
                  style={{ display: 'none' }}
                  accept=".mp3"
                />
              </div>
              {errors.musicAudio?.message && (
                <span>{String(errors.musicAudio.message)}</span>
              )}
            </div>
            <div className={styles.inputContainer}>
              <p>Select Artist</p>
              <select
                {...register('artistId', {
                  required: 'Artist selection is required',
                  onChange: handleArtistChange,
                })}
              >
                <option value="">Select an artist</option>
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

            <div className={styles.inputContainer}>
              <p>Select Album</p>
              <select
                {...register('albumId', {
                  required: 'Album selection is required',
                })}
                disabled={!selectedArtistId}
              >
                <option value="">Select an album</option>
                {filteredAlbums.map((album) => (
                  <option key={album.id} value={album.id}>
                    {album.name}
                  </option>
                ))}
              </select>
              {errors.albumId?.message && (
                <span>{String(errors.albumId.message)}</span>
              )}
            </div>
          </div>
          <div className={styles.coverContainer}>
            <p>Upload Cover Image</p>
            <label htmlFor="coverImage">
              <Image
                src={selectedCoverImage}
                alt="upload"
                width={496}
                height={240}
                style={{ cursor: 'pointer' }}
              />
            </label>
            <input
              type="file"
              id="coverImage"
              {...register('coverImage', {
                required: 'Cover image is required',
                onChange: handleCoverImageChange,
              })}
              style={{ display: 'none' }}
              accept=".jpg,.jpeg,.png"
            />
            <span>Music Cover is required</span>
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
