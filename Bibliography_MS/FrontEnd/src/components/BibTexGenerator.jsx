import React from 'react';

const BibTeXGenerator = ({ bibtexEntry }) => {
  return (
    <div>
      <h2>BibTeX Entry</h2>
      {bibtexEntry ? (
        <textarea
          value={bibtexEntry}
          readOnly
          rows={10}
          cols={15}
          style={{ marginTop: '10px', fontFamily: 'monospace' }}
        />
      ) : (
        <p>No BibTeX entry selected. Click "Generate BibTeX" to view an entry.</p>
      )}
    </div>
  );
};

export default BibTeXGenerator;