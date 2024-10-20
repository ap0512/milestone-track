import React, { useState } from 'react';

interface UserFormProps {
  addUser: (name: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ addUser }) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      addUser(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
