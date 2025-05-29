// This component displays a list of bibliographic entries and allows the user to delete them.
// And also allows you to generate bibtex of the entries

const BibliographyList = ({ authorsData, handleDeleteEntry, handleFetchBibTeX }) => {
 
  return (
    <div>
      <h2>Bibliographic Entries</h2>
      <ul>
        {authorsData.map((author) => (
          <li key={author.reference_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>{author.title}</strong> by ({author.authors}) ({author.year}) <button
                onClick={() => handleFetchBibTeX(author.reference_id)} // Fetch BibTeX for this entry
                style={{
                  background: 'none',
                  border: '1px solid blue',
                  color: 'blue',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginRight: '10px',
                }}
                
              >
                Generate BibTeX
              </button>
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