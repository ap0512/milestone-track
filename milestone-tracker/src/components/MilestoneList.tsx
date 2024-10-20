import React from 'react';

interface Milestone {
  name: string;
  totalPages: number;
}

interface MilestoneListProps {
  milestones: Milestone[];
  completedPages: number[];
  onUpdatePages: (index: number, pages: number) => void;
}

const MilestoneList: React.FC<MilestoneListProps> = ({ milestones, completedPages, onUpdatePages }) => {
  return (
    <ul>
      {milestones.map((milestone, index) => (
        <li key={index}>
          <label>
            {milestone.name} (Total Pages: {milestone.totalPages})
            <br />
            <input
              type="number"
              value={completedPages[index]}
              onChange={(e) => {
                const pages = Math.min(Math.max(Number(e.target.value), 0), milestone.totalPages); // Bound to 0 and total pages
                onUpdatePages(index, pages);
              }}
              min="0"
              max={milestone.totalPages}
              placeholder={`Completed Pages (Max: ${milestone.totalPages})`}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default MilestoneList;
