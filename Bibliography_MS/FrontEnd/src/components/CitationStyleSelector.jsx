import React, { useState } from 'react';

// Helper functions to format the reference in each style
const formatAPA = (entry) => {
  // APA: Author, A. A. (Year). Title. Journal, Volume(Issue), pages.
  return `${entry.authors}. (${entry.year}). ${entry.title}. ${entry.journal}, ${entry.volume}(${entry.issue}), ${entry.pages}.`;
};

const formatIEEE = (entry) => {
  // IEEE: A. Author, "Title," Journal, vol. X, no. Y, pp. Z, Year.
  return `${entry.authors}, "${entry.title}," ${entry.journal}, vol. ${entry.volume}, no. ${entry.issue}, pp. ${entry.pages}, ${entry.year}.`;
};

const formatHarvard = (entry) => {
  // Harvard: Author, A.A., Year. Title. Journal, Volume(Issue), pages.
  return `${entry.authors}, ${entry.year}. ${entry.title}. ${entry.journal}, ${entry.volume}(${entry.issue}), ${entry.pages}.`;
};

const formatChicago = (entry) => {
  // Chicago: Author. "Title." Journal Volume, no. Issue (Year): pages.
  return `${entry.authors}. "${entry.title}." ${entry.journal} ${entry.volume}, no. ${entry.issue} (${entry.year}): ${entry.pages}.`;
};

const CitationStyleSelector = ({ entry }) => {
  // State to hold the formatted reference for display
  const [formattedReference, setFormattedReference] = useState('');
 //Placeholder for Formating Logic
// console.log('Formating references in ${style} style');
  // This function is called when the user selects a citation style.
  // It formats the reference using the selected style and updates the state.
  const formatReferences = (style) => {
    if (!style || !entry) {
      setFormattedReference('');
      return;
    }
    let formatted = '';
    switch (style) {
      case 'APA':
        formatted = formatAPA(entry);
        break;
      case 'IEEE':
        formatted = formatIEEE(entry);
        break;
      case 'Harvard':
        formatted = formatHarvard(entry);
        break;
      case 'Chicago':
        formatted = formatChicago(entry);
        break;
      default:
        formatted = '';
    }
    setFormattedReference(formatted); // Update the textarea with the formatted reference
  };
  return (
    <div>
      <h2>Select Citation Style</h2>
      {/* Dropdown for selecting citation style */}
      <select onChange={(e) => formatReferences(e.target.value)}>
        <option value="">Select Style</option>
        <option value="APA">APA</option>
        <option value="IEEE">IEEE</option>
        <option value="Harvard">Harvard</option>
        <option value="Chicago">Chicago</option>
      </select>
      {/* Textarea displays the formatted reference or a message if no entry is selected */}
      {/* <textarea
        value={formattedReference || (entry ? "Select a style to format reference." : "No entry selected")}
        readOnly
        rows={10}
        cols={80}
        style={{ marginTop: '10px', fontFamily: 'monospace' }}
      /> */}
    </div>
  );
};

export default CitationStyleSelector;