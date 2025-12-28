const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000; // Changed from 5000 to avoid conflicts

// Middleware
app.use(cors());
app.use(express.json());

// Path to tasks.json
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from file
const readTasks = () => {
  try {
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks file:', error);
    return [];
  }
};

// Helper function to write tasks to file
const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error writing tasks file:', error);
  }
};

// Routes

// GET / - Welcome message
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Task Management API' });
});

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.status(200).json(tasks);
});

// POST /tasks - Add new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const tasks = readTasks();
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    description,
    completed: false
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (title !== undefined) tasks[taskIndex].title = title;
  if (description !== undefined) tasks[taskIndex].description = description;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  writeTasks(tasks);
  res.status(200).json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  writeTasks(tasks);
  res.status(200).json(deletedTask);
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Tasks API available at: http://localhost:${PORT}/tasks`);
  console.log(`🚀 Opening browser to tasks page...`);

  // Automatically open browser to tasks page
  const { exec } = require('child_process');
  const url = `http://localhost:${PORT}/tasks`;

  // Use start command for Windows
  exec(`start ${url}`, (error) => {
    if (error) {
      console.log(`❌ Could not open browser automatically. Please visit: ${url}`);
    } else {
      console.log(`✅ Browser opened to: ${url}`);
    }
  });
});