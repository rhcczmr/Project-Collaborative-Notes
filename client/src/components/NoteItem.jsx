import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const NoteItem = ({ note, onUpdate, onDelete }) => {
  // Pastikan note memiliki properti yang dibutuhkan
  const title = note?.title || 'Untitled';
  const content = note?.content || 'No content';

  return (
    <Card elevation={3} sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 4
      }
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', padding: 1 }}>
        <IconButton 
          size="small" 
          color="primary" 
          onClick={() => onUpdate && onUpdate(note)}
          sx={{ marginRight: 1 }}
        >
          <EditIcon />
        </IconButton>
        <IconButton 
          size="small" 
          color="error" 
          onClick={() => onDelete && onDelete(note.id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteItem;