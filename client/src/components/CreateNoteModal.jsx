import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import socket from '../services/websocket';

const CreateNoteModal = ({ note, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Personal'
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        category: note.category
      });
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (note) {
        socket.emit('updateNote', {
          id: note.id,
          ...formData,
          timestamp: new Date().toISOString()
        });
      } else {
        socket.emit('createNote', {
          ...formData,
          timestamp: new Date().toISOString()
        });
      }
      console.log(`Note ${note ? 'updated' : 'created'} successfully`);
      onClose();
    } catch (error) {
      console.error(`Error ${note ? 'updating' : 'creating'} note:`, error);
    }
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      width: '90%',
      maxWidth: '600px',
      position: 'relative',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      minHeight: '200px',
      resize: 'vertical',
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      backgroundColor: 'white',
    },
    button: {
      padding: '10px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#000',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
    },
    characterCount: {
      fontSize: '12px',
      color: '#64748b',
      textAlign: 'right',
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>
          {note ? 'Edit Note' : 'Create New Note'}
        </h2>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Title"
              style={styles.input}
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              maxLength={50}
              required
            />
            <div style={styles.characterCount}>
              {formData.title.length}/50
            </div>
          </div>

          <div>
            <textarea
              placeholder="Content"
              style={styles.textarea}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              maxLength={500}
              required
            />
            <div style={styles.characterCount}>
              {formData.content.length}/500
            </div>
          </div>

          <select
            style={styles.select}
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Ideas">Ideas</option>
            <option value="Tasks">Tasks</option>
          </select>

          <button type="submit" style={styles.button}>
            {note ? 'Save Changes' : 'Create Note'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;