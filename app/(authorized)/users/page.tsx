'use client';

import { useState, useEffect } from 'react';
import Search from '@/app/Components/Search/Search';
import styles from './page.module.scss';
import UserRow from '@/app/Components/UserRow/UserRow';
import BaseApi from '@/app/api/BaseApi';
import { UserPropsInterface } from './[id]/interfaces/playlist-props.interface';

const Users = () => {
  const [users, setUsers] = useState<UserPropsInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserPropsInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await BaseApi.get('/user');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        alert('Could not get users');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await BaseApi.delete(`/user/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.filter((user) => user.id !== id),
      );
    } catch (error) {
      alert('Could not delete user');
    }
  };

  const handleBlock = async (id: number) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex < 0) return;

    const newBlockState = !users[userIndex].banned;
    setUsers((prevUsers) =>
      prevUsers.map((user, index) =>
        index === userIndex ? { ...user, banned: newBlockState } : user,
      ),
    );
    setFilteredUsers((prevFilteredUsers) =>
      prevFilteredUsers.map((user, index) =>
        index === userIndex ? { ...user, banned: newBlockState } : user,
      ),
    );

    try {
      await BaseApi.post(`/user/${id}`, { banned: newBlockState });
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
      setUsers((prevUsers) =>
        prevUsers.map((user, index) =>
          index === userIndex ? { ...user, banned: !newBlockState } : user,
        ),
      );
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user, index) =>
          index === userIndex ? { ...user, banned: !newBlockState } : user,
        ),
      );
    }
  };

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase();
    const results = users.filter((user) =>
      user.email.toLowerCase().includes(lowercasedValue),
    );
    setFilteredUsers(results);
  };

  return (
    <div className={styles.wrapper}>
      <h1>All Users</h1>
      <Search
        onSearch={handleSearch}
        results={filteredUsers?.map?.((user) => user.email)}
      />
      <div className={styles.container}>
        {filteredUsers?.map?.((user) => (
          <UserRow
            key={user.id}
            id={user.id}
            email={user.email}
            banned={user.banned}
            onDelete={handleDelete}
            onBlock={handleBlock}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
