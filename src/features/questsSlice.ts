// features/questsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Quest } from '../types';

export const fetchQuests = createAsyncThunk('quests/fetchQuests', async () => {
  const response = await axios.get('http://localhost:3000/api/quests');
  return response.data;
});

export const addQuest = createAsyncThunk('quests/addQuest', async (newQuest: Partial<Quest>) => {
  const response = await axios.post('http://localhost:3000/api/quests', newQuest);
  return response.data;
});

export const deleteQuest = createAsyncThunk('quests/deleteQuest', async (id: string) => {
  await axios.delete(`http://localhost:3000/api/quests/${id}`);
  return id;
});

export const toggleCompleted = createAsyncThunk('quests/toggleCompleted', async (id: string) => {
  const response = await axios.patch(`http://localhost:3000/api/quests/${id}/toggle`);
  return response.data;
});

const questsSlice = createSlice({
  name: 'quests',
  initialState: {
    quests: [] as Quest[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.quests = action.payload;
      })
      .addCase(addQuest.fulfilled, (state, action) => {
        state.quests.push(action.payload);
      })
      .addCase(deleteQuest.fulfilled, (state, action) => {
        state.quests = state.quests.filter(quest => quest._id !== action.payload);
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const quest = state.quests.find(quest => quest._id === action.payload._id);
        if (quest) {
          quest.completed = action.payload.completed;
        }
      });
  }
});

export default questsSlice.reducer;
