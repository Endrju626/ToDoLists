// TodoList.tsx
import React from 'react';
import { Quest } from './types';

interface TodoListProps {
  quests: Quest[];
  category: string;
  deleteQuest: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ quests, category, deleteQuest, toggleCompleted }) => {
  return (
    <div>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Quests</h2> {/* Dodaj tytuł z nazwą kategorii */}
      <ul>
        {quests.filter(quest => quest.category === category).map(quest => (
          <li key={quest._id}>
            <span
              style={{ textDecoration: quest.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompleted(quest._id)}
            >
              {quest.value}
            </span>
            <button onClick={() => deleteQuest(quest._id)}>Delete</button>
            <button onClick={() => toggleCompleted(quest._id)}>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
