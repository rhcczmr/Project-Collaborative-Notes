import React from 'react';
import NotesList from './components/NotesList';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Collaborative Notes
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <NotesList />
      </Box>
    </Box>
  );
}

export default App;