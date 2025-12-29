const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for tasks
let tasks = [];

// Routes

// GET / - Welcome message
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Task Management API' });
});

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// POST /tasks - Add new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (title !== undefined) tasks[taskIndex].title = title;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  res.status(200).json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.status(200).json(deletedTask);
});

// Export for Vercel deployment
module.exports = app;