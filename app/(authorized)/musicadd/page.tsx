'use client';

import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import styles from './page.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface FormInputs {
  songTitle: string;
  artistName: string;
  albumName: string;
}

const MusicAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store the uploaded image

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  // Function to handle the image click and trigger the file input
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle the file input change and store the uploaded image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Store the uploaded image URL
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>{'All Song > Add Song'}</h1>
        <AddNewItem href="/" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <input
              {...register('songTitle', { required: 'Song title is required' })}
              type="text"
              placeholder="Enter song title"
            />
            {errors.songTitle && <p>{errors.songTitle.message}</p>}

            <input
              {...register('artistName', {
                required: 'Artist name is required',
              })}
              type="text"
              placeholder="Enter artist name"
            />
            {errors.artistName && <p>{errors.artistName.message}</p>}

            <input
              {...register('albumName', { required: 'Album name is required' })}
              type="text"
              placeholder="Enter album name"
            />
            {errors.albumName && <p>{errors.albumName.message}</p>}
          </div>

          {/* Clickable image to trigger file upload */}
          <Image
            src={selectedImage || '/uplode.png'} // Display uploaded image or placeholder
            alt="cover"
            width={496}
            height={240}
            onClick={handleImageClick} // Handle image click
            style={{ cursor: 'pointer' }} // Make it look clickable
          />

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} // Hide the file input
            onChange={handleFileChange} // Handle file change
          />

          <div>
            <button type="submit">Add Song</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MusicAdd;
