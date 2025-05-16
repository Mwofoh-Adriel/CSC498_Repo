// This component displays a list of bibliographic entries and allows the user to delete them.
// It fetches the authors from the database and displays them in the bibliography list.

//Code to fetch the authors from the database and display them in the bibliography list
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BibliographyList = ({ authorsData, handleDeleteEntry }) => {
 

  return (
    <div>
      <h2>Bibliographic Entries</h2>
      <ul>
        {authorsData.map((author) => (
          <li key={author.reference_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>{author.title}</strong> by ({author.authors}) ({author.year})
            </div>
            <button
              onClick={() => handleDeleteEntry(author.reference_id)} // Using `id` for deletion
              style={{
                background: 'none',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              title="Delete Author"
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
