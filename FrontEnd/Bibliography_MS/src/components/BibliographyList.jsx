import React from 'react';

const BibliographyList = ({ entries, deleteEntry }) => {
  return (
    <div>
      <h2>Bibliographic Entries</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>{entry.title}</strong> by {entry.authors.join(', ')} ({entry.year})
            </div>
            <button
              onClick={() => deleteEntry(index)}
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