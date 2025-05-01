import React from 'react';

const BibliographyList = ({ entries, handleDeleteEntry }) => {
  return (
    <div>
      <h2>Bibliographic Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.reference_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>{entry.title}</strong> by {entry.authors.join(', ')} ({entry.year})
            </div>
            <button
              onClick={() => handleDeleteEntry(entry.reference_id)} // Pass reference_id instead of index
              style={{
                background: 'none',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              title="Delete Entry"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BibliographyList;