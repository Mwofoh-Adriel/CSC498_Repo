import React, { useState } from 'react';
import BibliographyForm from './components/BibliographyForm';
import BibliographyList from './components/BibliographyList';
import BibTeXGenerator from './components/BibTexGenerator';
import CitationStyleSelector from './components/CitationStyleSelector';
import './App.css';
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries([...entries, entry]);
  };

  // const deleteEntry = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:3001/delete-entry/${id}`);
  //     console.log(response.data.message);
  //     const updatedEntries = entries.filter((_, i) => i !== id);
  //     setEntries(updatedEntries);
  // };

  const handleDeleteEntry = async (reference_id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/delete-entry/${reference_id}`);
      console.log(response.data.message);
  
      // Update the UI after deletion
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.reference_id !== reference_id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div className="App">
      <h1>Bibliographic Management System</h1>
      <BibliographyForm onAddEntry={addEntry} />
      <BibliographyList entries={entries} handleDeleteEntry={handleDeleteEntry} />
      <BibTeXGenerator entries={entries} />
      <CitationStyleSelector entries={entries} />
    </div>
  );
}

export default App;