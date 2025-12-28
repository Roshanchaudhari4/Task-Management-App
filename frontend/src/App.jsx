import React, { useState, useEffect } from 'react';
import { Container, Snackbar, Alert } from '@mui/material';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, addTask, updateTask, deleteTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    console.log('App component mounted, fetching tasks...');
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks from API...');
      const data = await getTasks();
      console.log('Tasks received from API:', data);
      console.log('Tasks count:', data.length);
      setTasks(data);
      console.log('Tasks set in state:', data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      console.error('Error details:', error.response || error.message);
    }
  };

  const handleAddTask = async (task) => {
    try {
      const newTask = await addTask(task);
      setTasks([...tasks, newTask]);
      setShowModal(false);
      setSnackbar({ open: true, message: 'Task added successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error adding task:', error);
      setSnackbar({ open: true, message: 'Error adding task', severity: 'error' });
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      const updatedTask = await updateTask(task.id, task);
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
      setShowModal(false);
      setEditingTask(null);
      setSnackbar({ open: true, message: 'Task updated successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error updating task:', error);
      setSnackbar({ open: true, message: 'Error updating task', severity: 'error' });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      setSnackbar({ open: true, message: 'Task deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error deleting task:', error);
      setSnackbar({ open: true, message: 'Error deleting task', severity: 'error' });
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <Navbar onAddTask={() => setShowModal(true)} />
      <Container maxWidth="lg" className="mt-4">
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleComplete={(id) => {
            const task = tasks.find(t => t.id === id);
            handleUpdateTask({ ...task, completed: !task.completed });
          }}
        />
      </Container>
      <TaskForm
        open={showModal}
        onClose={handleCloseModal}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        task={editingTask}
      />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;