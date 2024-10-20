
import React, { useState } from 'react';
import UserForm from './UserForm';
import MilestoneList from './MilestoneList';

// Define types for Milestone and User
interface Milestone {
  name: string;
  totalPages: number;
}

interface User {
  name: string;
  completedPages: number[]; // Track pages completed for each milestone
}

const MilestoneTracker: React.FC = () => {
  // Milestones with total pages for each
  const milestones: Milestone[] = [
    { name: 'Introduction', totalPages: 4-1+1 },
    { name: 'Related Work', totalPages: 9-5+1 },
    { name: 'Requirements Specification', totalPages: 12-10+1 },
    { name: 'System Design', totalPages: 15-13+1 },
    { name: 'System Implementation', totalPages: 25-19+1 },
    { name: 'System Testing', totalPages: 32-31+1 },
    { name: 'Results', totalPages: 35-33+1 },
    { name: 'Conclusion', totalPages: 1 },
    { name: 'References', totalPages: 38-37+1 },

  ];

  const totalReportPages = 42;

  // State for managing users
  const [users, setUsers] = useState<User[]>([]);

  // Function to add a new user
  const addUser = (name: string) => {
    // Initialize completedPages with 0 for each milestone
    setUsers([...users, { name, completedPages: Array(milestones.length).fill(0) }]);
  };

  // Function to update the completed pages for a user
  const updateUserPages = (userIndex: number, milestoneIndex: number, pages: number) => {
    setUsers(users.map((user, idx) => {
      if (idx === userIndex) {
        const updatedPages = [...user.completedPages];
        updatedPages[milestoneIndex] = pages;
        return { ...user, completedPages: updatedPages };
      }
      return user;
    }));
  };

  // Calculate total pages completed by a user
  const calculateTotalPages = (user: User) => {
    return user.completedPages.reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <div>
      <h1>Milestone Tracker</h1>
      <UserForm addUser={addUser} />
      {users.length > 0 && (
        <div>
          {users.map((user, index) => (
            <div key={index}>
              <h2>{user.name}'s Progress</h2>
              <MilestoneList
                milestones={milestones}
                completedPages={user.completedPages}
                onUpdatePages={(milestoneIndex, pages) => updateUserPages(index, milestoneIndex, pages)}
              />
              <p>
                Contribution: {((calculateTotalPages(user) / totalReportPages) * 100).toFixed(2)}%
                ({calculateTotalPages(user)} of {totalReportPages} pages)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MilestoneTracker;
