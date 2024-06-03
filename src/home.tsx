import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { fetchQuests, deleteQuest, toggleCompleted } from './features/questsSlice';
import Header from './Header';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import './App.css';

const Home: React.FC = () => {
  const quests = useSelector((state: RootState) => state.quests.quests);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQuests());
  }, [dispatch]);

  const handleDeleteQuest = (id: string) => {
    dispatch(deleteQuest(id));
  };

  const handleToggleCompleted = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <div className="App">
      <Header />
      <AddTodoForm />
      <div className="container">
        <div className="box">
          <h1>Weekly</h1>
          <TodoList quests={quests} category="weekly" deleteQuest={handleDeleteQuest} toggleCompleted={handleToggleCompleted} />
        </div>
        <div className="box">
          <h1>Monthly</h1>
          <TodoList quests={quests} category="monthly" deleteQuest={handleDeleteQuest} toggleCompleted={handleToggleCompleted} />
        </div>
        <div className="box">
          <h1>Today</h1>
          <TodoList quests={quests} category="today" deleteQuest={handleDeleteQuest} toggleCompleted={handleToggleCompleted} />
        </div>
      </div>
    </div>
  );
};

export default Home;
