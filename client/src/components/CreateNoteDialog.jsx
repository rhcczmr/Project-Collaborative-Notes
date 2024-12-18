import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const CreateNoteDialog = ({ open, onClose, onSave }) => {
  const [note, setNote] = useState({
    title: '',
    content: ''
  });
  const [titleError, setTitleError] = useState({
    error: false,
    message: ''
  });
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 50;

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setNote({
      title: '',
      content: ''
    });
    setTitleError({
      error: false,
      message: ''
    });
    setCharCount(0);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const length = newTitle.length;
    console.log('Title changed:', newTitle);
    setCharCount(length);

    if (length > MAX_CHARS) {
      setTitleError({
        error: true,
        message: 'Title too long (max 50 characters)'
      });
    } else if (length >= MAX_CHARS - 5) {
      setTitleError({
        error: false,
        message: `${MAX_CHARS - length} characters left`
      });
    } else {
      setTitleError({
        error: false,
        message: ''
      });
    }

    setNote(prev => ({
      ...prev,
      title: newTitle
    }));
  };

  const handleContentChange = (e) => {
    console.log('Content changed:', e.target.value);
    setNote(prev => ({
      ...prev,
      content: e.target.value
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting note:', note);
    if (note.title.trim() && note.content.trim()) {
      onSave(note);
      resetForm();
    }
  };

  const isValid = note.title.trim() && note.content.trim() && !titleError.error;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>Create New Note</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography 
              variant="caption" 
              color={titleError.error ? "error" : "text.secondary"}
            >
              {titleError.message}
            </Typography>
            <Typography 
              variant="caption" 
              color={titleError.error ? "error" : "text.secondary"}
            >
              {charCount}/{MAX_CHARS}
            </Typography>
          </Box>

          <TextField
            autoFocus
            fullWidth
            label="Title"
            value={note.title}
            onChange={handleTitleChange}
            error={titleError.error}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={note.content}
            onChange={handleContentChange}
            variant="outlined"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isValid}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNoteDialog;