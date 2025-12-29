import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const TaskForm = ({ open, onClose, onSubmit, task }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    } else {
      setTitle('');
    }
  }, [task, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onSubmit({ ...task, title });
    } else {
      onSubmit({ title });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {task ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;