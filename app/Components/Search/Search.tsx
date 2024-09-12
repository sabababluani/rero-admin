'use client';

import { useState, useEffect } from 'react';
import styles from './Seach.module.scss';
import Image from 'next/image';
import { dummyData } from './searchDummyData/searchDummyData';

const Search = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const fetchResults = () => {
      if (inputValue.trim() === '') {
        setResults([]);
        return;
      }

      const filteredResults = dummyData.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setResults(filteredResults);
    };

    fetchResults();
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setInputValue('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <Image src="/search.png" alt="search" width={24} height={24} />
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className={styles.input}
      />
      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((result, index) => (
            <li key={index} className={styles.resultItem}>
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
