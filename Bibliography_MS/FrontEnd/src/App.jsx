import React, { useEffect, useState } from 'react';
import BibliographyForm from './components/BibliographyForm';
import BibliographyList from './components/BibliographyList';
import BibTeXGenerator from './components/BibTexGenerator';
import CitationStyleSelector from './components/CitationStyleSelector';
import './App.css';
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState([]);
  const [authorsData, setAuthorsData] = useState([]);
  const [selectedBibTeX, setSelectedBibTeX] = useState("")

  //..........................................................................................
  //State to add new entries to the database
  const addEntry = (entry) => {
    setEntries([...entries, entry]);
  };


//.............................................................................................
  //Function to fetch authors data from the database
  // Fetch authors data from the database and store in authorsData

  // Fetch authors information from the database
  const fetchAuthorsData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get-authors');
      setAuthorsData(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAuthorsData();
  }, []);


//..............................................................................................
  //Function to handle the deletion of entries from the database

  const handleDeleteEntry = async (reference_id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    
    if (!confirmDelete) {
      // If the user cancels, exit the function
      return;
    }
  // Make a DELETE request to the server if the user confirms
    try {
      const response = await axios.delete(`http://localhost:3001/delete-entry/${reference_id}`);
      console.log(response.data.message);
  
      // Update the UI after deletion
      
    fetchAuthorsData(); // Fetch the updated authors data after deletion

    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };
  

  //............................................................................................
  //Function to handle fetching individual bibtex entry
  
    const handleFetchBibTeX = async (reference_id) => {
      try {
        const response = await axios.get(`http://localhost:3001/get-bibtex/${reference_id}`);
        setSelectedBibTeX(response.data); // Set the BibTeX entries to Entryresult
        // console.log("here's the bibtex entry for this person:", selectedBibTeX)
      } catch (error) {
        console.error('Error fetching BibTeX entries:', error);
      }
    };


    //.........................................................................................
  return (
    <div className="App">
      <h1>Bibliographic Management System</h1>
      <BibliographyForm fetchAuthorsData={fetchAuthorsData} onAddEntry={addEntry} />
      <BibliographyList authorsData={authorsData} handleDeleteEntry={handleDeleteEntry} handleFetchBibTeX={handleFetchBibTeX} />
      <BibTeXGenerator bibtexEntry={selectedBibTeX} />
      <CitationStyleSelector entries={entries} />
    </div>
  );
}

export default App;