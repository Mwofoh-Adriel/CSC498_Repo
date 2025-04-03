import React, { useState } from 'react';
import BibliographyForm from './components/BibliographyForm';
import BibliographyList from './components/BibliographyList';
import BibTeXGenerator from './components/BibTexGenerator';
import CitationStyleSelector from './components/CitationStyleSelector';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries([...entries, entry]);
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  return (
    <div className="App">
      <h1>Bibliographic Management System</h1>
      <BibliographyForm onAddEntry={addEntry} />
      <BibliographyList entries={entries} deleteEntry={deleteEntry} />
      <BibTeXGenerator entries={entries} />
      <CitationStyleSelector entries={entries} />
    </div>
  );
}

export default App;