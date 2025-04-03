import React from 'react';

const CitationStyleSelector = ({ entries }) => {
  const formatReferences = (style) => {
    // Placeholder for formatting logic
    console.log(`Formatting references in ${style} style`);
  };

  return (
    <div>
      <h2>Select Citation Style</h2>
      <select onChange={(e) => formatReferences(e.target.value)}>
        <option value="">Select Style</option>
        <option value="APA">APA</option>
        <option value="IEEE">IEEE</option>
        <option value="Harvard">Harvard</option>
      </select>
    </div>
  );
};

export default CitationStyleSelector;