import React from 'react';
import { X } from 'lucide-react';

const NoteDetailModal = ({ note, onClose }) => {
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
      maxHeight: '90vh',
      overflowY: 'auto',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '16px',
      marginRight: '32px',
      marginTop: 0,
      wordBreak: 'break-word',
    },
    content: {
      fontSize: '16px',
      lineHeight: 1.6,
      marginBottom: '16px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      color: '#374151',
    },
    metadata: {
      fontSize: '14px',
      color: '#64748b',
    },
    category: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      marginBottom: '16px',
      backgroundColor: '#f1f5f9',
      color: '#475569',
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        
        <div style={styles.category}>
          {note.category}
        </div>

        <h2 style={styles.title}>{note.title}</h2>
        
        <div style={styles.content}>
          {note.content}
        </div>

        <div style={styles.metadata}>
          Created: {new Date(note.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailModal;