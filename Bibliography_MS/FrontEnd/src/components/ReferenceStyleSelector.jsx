import React, { useState } from 'react';

//function to parse BibTeX entries into a JavaScript object
// This function takes a BibTeX string and returns an object with the parsed data
function parseBibTeX(bibtex) {
  const result = {};
  const body = bibtex.replace(/^@\w+\{[^,]+,/, '').replace(/\}$/s, '');
  const regex = /(\w+)\s*=\s*\{([^}]*)\}/g;
  let match;
  while ((match = regex.exec(body)) !== null) {
    result[match[1]] = match[2];
  }
  const typeMatch = bibtex.match(/^@(\w+)\{([^,]+),/);
  if (typeMatch) {
    result.type = typeMatch[1];
    result.citationKey = typeMatch[2];
  }
  return result;
}

//Helper function to format authors in a standard way
function formatAuthors(authorsStr) {
  if (!authorsStr) return '';
  // Split authors by comma, trim whitespace
  const authors = authorsStr.split(',').map(a => a.trim());
  const formatted = authors.map(author => {
    const [first, ...rest] = author.split(' ');
    const surname = rest.length ? rest.pop() : first;
    const initials = [first, ...rest].map(n => n[0]?.toUpperCase() + '.').join(' ');
    return `${surname}, ${initials}`.replace(/, $/, ''); // Remove trailing comma if no initials
  });
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} & ${formatted[1]}`;
  return formatted.slice(0, -1).join(', ') + ' & ' + formatted[formatted.length - 1];
}

// Component to select a citation style and format the reference accordingly

const ReferenceStyleSelector = ({ entry }) => {
  const [formattedReference, setFormattedReference] = useState('');

  const formatAPA = (e) =>
    `(${e.author}, (${e.year}), ${e.title}, ${e.publisher ? e.publisher + '.' : ''})`;

const formatIEEE = (e) =>
  `${formatAuthors(e.author)} "${e.title}", ${e.publisher ? e.publisher + ',' : ''} ${e.year}.`;

const formatHarvard = (e) =>
  `${formatAuthors(e.author)} ${e.year} ${e.title} ${e.publisher ? e.publisher + '.' : ''}`;

  const formatChicago = (e) =>
    `${e.author}. "${e.title}." ${e.publisher ? e.publisher + '.' : ''} (${e.year}).`;

  const handleStyleChange = (style) => {
    if (!entry) {
      setFormattedReference('');
      return;
    }
    const parsed = parseBibTeX(entry);
    let formatted = '';
    switch (style) {
      case 'APA':
        formatted = formatAPA(parsed);
        break;
      case 'IEEE':
        formatted = formatIEEE(parsed);
        break;
      case 'Harvard':
        formatted = formatHarvard(parsed);
        break;
      case 'Chicago':
        formatted = formatChicago(parsed);
        break;
      default:
        formatted = '';
    }
    setFormattedReference(formatted);
  };

  return (
    <>
    <h2>Select Reference Style</h2>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <select onChange={(e) => handleStyleChange(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', fontSize: '16px', color: 'white', backgroundColor: '#4CAF50' }}>
        <option value="">Select Style</option>
        <option value="APA">APA</option>
        <option value="IEEE">IEEE</option>
        <option value="Harvard">Harvard</option>
        <option value="Chicago">Chicago</option>
      </select>
      <textarea
        value={formattedReference || (entry ? "Select a style to format reference." : "No entry selected")}
        readOnly
        rows={2}
        cols={80}
        style={{ marginTop: '0px', padding: '20px', fontFamily: 'monospace' }}
      />
    </div>
    </>
  );
};

export default ReferenceStyleSelector;