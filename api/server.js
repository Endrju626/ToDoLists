const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});

const questSchema = new mongoose.Schema({
  value: { type: String, required: true },
  category: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Quest = mongoose.model('Quest', questSchema);

app.get('/api/quests', async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json(quests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/quests', async (req, res) => {
  try {
    const newQuest = new Quest(req.body);
    await newQuest.save();
    res.json(newQuest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/quests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    await Quest.findByIdAndDelete(id);
    res.json({ message: 'Quest deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint do aktualizacji zadania
app.put('/api/quests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const updatedQuest = await Quest.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedQuest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nowy endpoint do zmiany statusu completed
app.patch('/api/quests/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const quest = await Quest.findById(id);
    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }
    quest.completed = !quest.completed;
    await quest.save();
    res.json(quest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
