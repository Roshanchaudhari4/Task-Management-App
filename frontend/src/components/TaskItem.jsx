import React from 'react';
import { TableRow, TableCell, Button, Chip, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <TableRow className={task.completed ? 'completed' : ''}>
      <TableCell>{task.title}</TableCell>
      <TableCell>
        <Chip
          label={task.completed ? 'Completed' : 'Pending'}
          color={task.completed ? 'success' : 'warning'}
          variant="outlined"
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => onEdit(task)}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;