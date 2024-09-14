'use client';

import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import UserRow from '@/app/Components/UserRow/UserRow';
import { useState } from 'react';

const userData = [
  { id: 1, email: 'user1', playlistCount: 5, songCount: 20, isBlocked: false },
  { id: 2, email: 'user2', playlistCount: 2, songCount: 12, isBlocked: false },
  { id: 3, email: 'user3', playlistCount: 7, songCount: 33, isBlocked: false },
  { id: 4, email: 'user4', playlistCount: 1, songCount: 8, isBlocked: false },
  { id: 5, email: 'user5', playlistCount: 0, songCount: 5, isBlocked: false },
];

const Users = () => {
  const [users, setUsers] = useState(userData);
  const [filteredUsers, setFilteredUsers] = useState(userData);

  const handleDelete = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleBlock = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBlocked: !user.isBlocked } : user,
      ),
    );
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    const results = userData.filter(user =>
      user.email.toLowerCase().includes(lowercasedValue)
    );
    setFilteredUsers(results);
  };

  return (
    <div className={styles.wrapper}>
      <h1>All Users</h1>
      <Search
        onSearch={handleSearch}
        results={filteredUsers.map(user => user.email)}
      />
      <div className={styles.container}>
        {filteredUsers.map((user) => (
          <UserRow
            key={user.id}
            id={user.id}
            email={user.email}
            playlistCount={user.playlistCount}
            songCount={user.songCount}
            isBlocked={user.isBlocked}
            onDelete={() => handleDelete(user.id)}
            onBlock={() => handleBlock(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
