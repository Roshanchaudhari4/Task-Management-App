import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ onAddTask }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Management Application
        </Typography>
        <Button color="inherit" onClick={onAddTask}>
          Add Task
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;