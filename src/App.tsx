import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { fetchQuests, addQuest, deleteQuest, toggleCompleted } from './features/questsSlice.ts';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header.tsx';
import AddTodoForm from './AddTodoForm.tsx';
import TodoList from './TodoList.tsx';
import './App.scss';
import { Quest } from './types.ts';

function App() {
  const quests = useSelector((state: RootState) => state.quests.quests);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQuests());
  }, [dispatch]);

  const handleAddQuest = (newQuest: string, category: string) => {
    if (!newQuest) {
      alert("Please enter the quest!");
      return;
    }

    const quest: Quest = {
      _id: Date.now().toString(),
      value: newQuest,
      category,
      completed: false
    };

    dispatch(addQuest(quest));
  };

  const handleDeleteQuest = (id: string) => {
    dispatch(deleteQuest(id));
  };

  const handleToggleCompleted = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <AddTodoForm />
        <div className="container">
          <Routes>
            <Route path="/" element={<h1>Welcome to the Todo App</h1>} />
            <Route path="/weekly" element={<TodoList quests={quests} category="weekly" deleteQuest={handleDeleteQuest} toggleCompleted={handleToggleCompleted} />} />
            <Route path="/monthly" element={<TodoList quests={quests} category="monthly" deleteQuest={handleDeleteQuest} toggleCompleted={handleToggleCompleted} />} />
            <Route path="/today" element={<TodoList quests={quests} category="today" deleteQuest={handleDeleteQuest} toggleCompleted={handleToggleCompleted} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
