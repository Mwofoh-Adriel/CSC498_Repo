import React, { useState } from 'react';

const BibliographyForm = ({ onAddEntry }) => {
  const [formData, setFormData] = useState({
    authors: [''],
    title: '',
    type: '',
    journal: '',
    year: '',
    volume: '',
    issue: '',
    pages: '',
    doi: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index] = value;
    setFormData({ ...formData, authors: updatedAuthors });
  };

  const addAuthorField = () => {
    setFormData({ ...formData, authors: [...formData.authors, ''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEntry(formData);
    setFormData({
      authors: [''],
      title: '',
      type: '',
      journal: '',
      year: '',
      volume: '',
      issue: '',
      pages: '',
      doi: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Bibliographic Entry</h2>
      {formData.authors.map((author, index) => (
        <div key={index}>
          <label>Author {index + 1}:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => handleAuthorChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addAuthorField}>
        Add Author
      </button>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleInputChange}>
          <option value="">Select Type</option>
          <option value="journal">Journal</option>
          <option value="book">Book</option>
          <option value="conference">Conference</option>
        </select>
      </div>

      {/* Conditionally Render Fields Based on Type */}
      {formData.type === 'journal' && (
        <>
          <div>
            <label>Journal:</label>
            <input type="text" name="journal" value={formData.journal} onChange={handleInputChange} />
          </div>
          <div>
            <label>Volume:</label>
            <input type="text" name="volume" value={formData.volume} onChange={handleInputChange} />
          </div>
          <div>
            <label>Issue:</label>
            <input type="text" name="issue" value={formData.issue} onChange={handleInputChange} />
          </div>
          <div>
            <label>Pages:</label>
            <input type="text" name="pages" value={formData.pages} onChange={handleInputChange} />
          </div>
        </>
      )}

      {formData.type === 'book' && (
        <>
          <div>
            <label>Publisher:</label>
            <input type="text" name="publisher" value={formData.publisher || ''} onChange={handleInputChange} />
          </div>
          <div>
            <label>Year:</label>
            <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
          </div>
        </>
      )}

      {formData.type === 'conference' && (
        <>
          <div>
            <label>Conference Name:</label>
            <input type="text" name="conference" value={formData.conference || ''} onChange={handleInputChange} />
          </div>
          <div>
            <label>Year:</label>
            <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
          </div>
          <div>
            <label>Pages:</label>
            <input type="text" name="pages" value={formData.pages} onChange={handleInputChange} />
          </div>
        </>
      )}

      <div>
        <label>DOI/URL:</label>
        <input type="text" name="doi" value={formData.doi} onChange={handleInputChange} />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default BibliographyForm;