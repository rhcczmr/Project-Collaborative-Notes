const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./config/firebase.js');

const app = express();
const server = http.createServer(app);

// Update CORS configuration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false
  }
});

// Enable CORS for HTTP requests
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));

app.use(express.json());

const notesRef = db.collection('notes');

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('getNotes', async () => {
    try {
      const snapshot = await notesRef.orderBy('timestamp', 'desc').get();
      const notes = [];
      snapshot.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      socket.emit('notesUpdated', notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      socket.emit('error', 'Failed to fetch notes');
    }
  });

  socket.on('createNote', async (noteData) => {
    try {
      const newNote = {
        ...noteData,
        id: uuidv4(),
        timestamp: new Date().toISOString()
      };
      
      await notesRef.doc(newNote.id).set(newNote);
      
      const snapshot = await notesRef.orderBy('timestamp', 'desc').get();
      const notes = [];
      snapshot.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      io.emit('notesUpdated', notes);
    } catch (error) {
      console.error('Error creating note:', error);
      socket.emit('error', 'Failed to create note');
    }
  });

  socket.on('updateNote', async (noteData) => {
    try {
      await notesRef.doc(noteData.id).update(noteData);
      
      const snapshot = await notesRef.orderBy('timestamp', 'desc').get();
      const notes = [];
      snapshot.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      io.emit('notesUpdated', notes);
    } catch (error) {
      console.error('Error updating note:', error);
      socket.emit('error', 'Failed to update note');
    }
  });

  socket.on('deleteNote', async (noteId) => {
    try {
      await notesRef.doc(noteId).delete();
      
      const snapshot = await notesRef.orderBy('timestamp', 'desc').get();
      const notes = [];
      snapshot.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      io.emit('notesUpdated', notes);
    } catch (error) {
      console.error('Error deleting note:', error);
      socket.emit('error', 'Failed to delete note');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

// Listen on all network interfaces
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access URLs:`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://192.168.204.137:${PORT}`);
});