import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NotesList from './components/NotesList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <NotesList />
    </div>
  );
}

export default App;