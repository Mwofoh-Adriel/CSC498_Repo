import axios from 'axios';
import React, { useState } from 'react';

const BibTexGenerator = () => {
  const [bibtexEntries, setBibtexEntries] = useState('');

  const handleFetchBibTeX = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get-bibtex');
      setBibtexEntries(response.data); // Set the BibTeX entries in state
    } catch (error) {
      console.error('Error fetching BibTeX entries:', error);
    }
  };

  return (
    <div>
      <h2>BibTeX Entries</h2>
      <button onClick={handleFetchBibTeX}>Fetch BibTeX Entries</button>
      {bibtexEntries && (<textarea
        value={bibtexEntries}
        readOnly
        rows={20}
        cols={80}
        style={{ marginTop: '10px', fontFamily: 'monospace' }}
      />)}
    </div>
  );
};

export default BibTexGenerator;
