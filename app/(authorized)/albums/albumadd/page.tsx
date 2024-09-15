'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './page.module.scss';
import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';

const AlbumAdd = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement | null>(null);
  const [albumName, setAlbumName] = useState('');

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

  const handleUploadClick = () => {
    if (coverImageInputRef.current) {
      coverImageInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!albumName) {
      alert('Album name is required');
      return;
    }
    const formData = new FormData();
    formData.append('albumName', albumName);

    if (coverImageInputRef.current?.files?.[0]) {
      formData.append('coverImage', coverImageInputRef.current.files[0]);
    }
    //TODO AXIOS --
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

  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <h1>{'All Albums > Add New Album'}</h1>
          <AddNewItem href="" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.containerWrapper}>
          <div className={styles.formContainer}>
            <div className={styles.form}>
              <div className={styles.inputsContainer}>
                <div className={styles.coverContainer}>
                  <p>Upload Cover Image</p>
                  <Image
                    src={selectedImage || '/uplode.png'}
                    alt="cover"
                    width={496}
                    height={220}
                    onClick={handleUploadClick}
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
                <p>Album Name</p>
                <input
                  type="text"
                  placeholder="Enter album name"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                />
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
