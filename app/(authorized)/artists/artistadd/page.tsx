'use client';

import AddNewItem from '@/app/Components/AddNewItem/AddNewItem';
import styles from './page.module.scss';
import Image from 'next/image';
import { useState } from 'react';

const ArtistAdd = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className={styles.wrapper}>
      <div>
        <h1>{'All Artists > Add New Artist'}</h1>
        <AddNewItem href="" />
      </div>
      <div>
        <div>
          <div className={styles.inputContainer}>
            <p>Song Title</p>
            <input type="text" placeholder="Enter song title" />
          </div>
          <div className={styles.textarea}>
            <textarea rows={4} cols={50}></textarea>
          </div>
        </div>
        {/* <div className={styles.coverContainer}>
          <p>Upload Cover Image</p>
          <Image
            src={selectedImage || '/uplode.png'}
            alt="cover"
            width={496}
            height={240}
            onClick={handleUploadClick}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            ref={coverImageInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ArtistAdd;
