import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuest } from './features/questsSlice.ts'; 
import { AppDispatch } from './app/store.ts'; 

const AddTodoForm: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [category, setCategory] = useState<string>('weekly');
  const dispatch = useDispatch<AppDispatch>(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      alert('Please enter a quest!');
      return;
    }
    dispatch(addQuest({ value, category })).then(() => {
      setValue('');
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add new quest"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="today">Today</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
