import React from 'react';

const BibTeXGenerator = ({ entries }) => {
  const generateBibTeX = () => {
    const bibtex = entries
      .map((entry, index) => {
        return `@${entry.type}{entry${index},
  author = {${entry.authors.join(' and ')}},
  title = {${entry.title}},
  year = {${entry.year}},
  journal = {${entry.journal}},
  volume = {${entry.volume}},
  number = {${entry.issue}},
  pages = {${entry.pages}},
  doi = {${entry.doi}}
}`;
      })
      .join('\n\n');
    console.log(bibtex);
  };

  return <button onClick={generateBibTeX}>Generate BibTeX</button>;
};

export default BibTeXGenerator;