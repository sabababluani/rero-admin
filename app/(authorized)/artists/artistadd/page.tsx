'use client';

import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import styles from './page.module.scss';
import Image from 'next/image';
import { useRef, useState } from 'react';
import axios from 'axios';

const ArtistAdd = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement | null>(null);
  const [artistName, setArtistName] = useState('');
  const [artistBio, setArtistBio] = useState('');

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

    if (!artistName) {
      alert('Artist name is required');
      return;
    }
    const formData = new FormData();
    formData.append('artistName', artistName);
    formData.append('artistBio', artistBio);

    if (coverImageInputRef.current?.files?.[0]) {
      formData.append('coverImage', coverImageInputRef.current.files[0]);
    }
    //TO DO AXIOS
    axios
      .post('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
  };

  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.container}>
        <h1>{'All Artists > Add New Artist'}</h1>
        <AddNewItem href="" />
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.form}>
            <div className={styles.inputsContainer}>
              <div className={styles.inputContainer}>
                <p>Artist Name</p>
                <input
                  type="text"
                  placeholder="Enter artist name"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </div>
              <div className={styles.textareaContainer}>
                <p>Artist Biography</p>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder="Enter artist biography"
                  value={artistBio}
                  onChange={(e) => setArtistBio(e.target.value)}
                />
              </div>
            </div>
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
          <div className={styles.buttonContainer}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtistAdd;
