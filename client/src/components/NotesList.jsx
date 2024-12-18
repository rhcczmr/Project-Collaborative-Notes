import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import socket from '../services/websocket';
import CreateNoteModal from './CreateNoteModal';
import NoteDetailModal from './NoteDetailModal';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    socket.emit('getNotes');

    socket.on('notesUpdated', (updatedNotes) => {
      console.log('Received updated notes:', updatedNotes);
      setNotes(updatedNotes || []);
    });

    return () => {
      socket.off('notesUpdated');
    };
  }, []);

  const categories = ['All Notes', 'Personal', 'Work', 'Ideas', 'Tasks'];

  const filteredNotes = notes?.filter(note => {
    if (!note?.title || !note?.content) return false;
    
    const matchesCategory = selectedCategory === 'All Notes' || note.category === selectedCategory;
    const matchesSearch = 
      note.title.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      note.content.toLowerCase().includes((searchQuery || '').toLowerCase());
    
    return matchesCategory && matchesSearch;
  }) || [];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      socket.emit('deleteNote', id);
    }
  };

  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#2196f3',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '500',
      zIndex: 100,
    },
    container: {
      display: 'flex',
      minHeight: 'calc(100vh - 60px)',
      marginTop: '60px',
      backgroundColor: '#ffffff',
      padding: '20px',
      gap: '30px',
    },
    sidebar: {
      width: '250px',
      flexShrink: 0,
      borderRight: '1px solid #e2e8f0',
      paddingRight: '20px',
    },
    newNoteButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '20px',
      fontSize: '14px',
    },
    categoryList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    categoryItem: {
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px',
      fontSize: '14px',
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '20px',
    },
    searchInput: {
      width: '100%',
      padding: '10px 10px 10px 40px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8',
    },
    notesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    noteCard: {
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      position: 'relative',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
    },
    noteTitle: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '8px',
      paddingRight: '60px',
    },
    noteContent: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '10px',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    noteTimestamp: {
      fontSize: '12px',
      color: '#94a3b8',
      marginTop: 'auto',
    },
    noteActions: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      display: 'flex',
      gap: '8px',
    },
    actionButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#64748b',
      borderRadius: '4px',
    },
  };

  return (
    <>
      <div style={styles.header}>
        Collaborative Notes
      </div>
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <button 
            style={styles.newNoteButton}
            onClick={() => {
              setSelectedNote(null);
              setShowCreateModal(true);
            }}
          >
            <Plus size={20} />
            New Note
          </button>

          <ul style={styles.categoryList}>
            {categories.map(category => (
              <li
                key={category}
                style={{
                  ...styles.categoryItem,
                  backgroundColor: selectedCategory === category ? '#f1f5f9' : 'transparent',
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                <span>
                  {category === 'All Notes' 
                    ? notes?.length || 0
                    : notes?.filter(note => note?.category === category)?.length || 0}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.searchContainer}>
            <Search style={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search all notes..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={styles.notesGrid}>
            {filteredNotes.map(note => (
              <div 
                key={note.id} 
                style={styles.noteCard}
                onClick={() => {
                  setSelectedNote(note);
                  setShowDetailModal(true);
                }}
              >
                <div style={styles.noteActions}>
                  <button 
                    style={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNote(note);
                      setShowCreateModal(true);
                    }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    style={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <h3 style={styles.noteTitle}>{note.title}</h3>
                <p style={styles.noteContent}>{note.content}</p>
                <small style={styles.noteTimestamp}>
                  {new Date(note.timestamp).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>

        {showCreateModal && (
          <CreateNoteModal
            note={selectedNote}
            onClose={() => {
              setShowCreateModal(false);
              setSelectedNote(null);
            }}
          />
        )}

        {showDetailModal && selectedNote && (
          <NoteDetailModal
            note={selectedNote}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedNote(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default NotesList;