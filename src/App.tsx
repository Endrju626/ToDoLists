// App.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { fetchQuests, addQuest, deleteQuest, toggleCompleted } from './features/questsSlice.ts';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import AddTodoForm from './AddTodoForm.tsx';
import TodoList from './TodoList.tsx';
import './App.css';
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
    <div className="App">
      <Header />
      <AddTodoForm />
      <div className="container">
        <div className="box">
          <h1>Weekly</h1>
          <TodoList
            quests={quests}
            category="weekly"
            deleteQuest={handleDeleteQuest}
            toggleCompleted={handleToggleCompleted}
          />
        </div>
        <div className="box">
          <h1>Monthly</h1>
          <TodoList
            quests={quests}
            category="monthly"
            deleteQuest={handleDeleteQuest}
            toggleCompleted={handleToggleCompleted}
          />
        </div>
        <div className="box">
          <h1>Today</h1>
          <TodoList
            quests={quests}
            category="today"
            deleteQuest={handleDeleteQuest}
            toggleCompleted={handleToggleCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
