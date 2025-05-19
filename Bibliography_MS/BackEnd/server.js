// Description: This is a simple Express server that connects to a MySQL database and handles form submissions for adding
//  bibliographic entries. It uses the mysql package to interact with the database and body-parser middleware to parse
//  incoming JSON requests.
// The server listens on port 3001 and has an endpoint '/add-entry' that accepts POST requests with bibliographic data.
// The data is inserted into the 'reference' table, and the authors are inserted into the 'authors' table.
//  If an author already exists, it updates the author ID.
// It also links the reference ID and author ID in the 'reference_authors' table.
//  The server responds with success or error messages based on the database operations.

//..............................................................................................
//Setup database
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Create a connection to the MySQL database using a connection pool
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bibliography_sys'
});

console.log('Database connection pool created');


//..............................................................................................
// Endpoint to handle form submissions
app.post('/add-entry', async (req, res) => {
    // Extract data from the request body

    const { authors, title, publisher, type, year, volume, issue, pages, doi } = req.body;

    try {
        const referenceQuery = `
            INSERT INTO reference (title, publisher, type, year, volume, issue, pages, doi)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const referenceResult = await new Promise((resolve, reject) => {
            db.query(referenceQuery, [title, publisher, type, year, volume, issue, pages, doi], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        const referenceId = referenceResult.insertId;

        const authorPromises = authors.map(author => {
            return new Promise((resolve, reject) => {
                const authorQuery = 'INSERT INTO authors (name) VALUES (?) ON DUPLICATE KEY UPDATE author_id = LAST_INSERT_ID(author_id)';
                db.query(authorQuery, [author], (err, result) => {
                    if (err) return reject(err);
                    const authorId = result.insertId;
                    const linkQuery = 'INSERT INTO reference_authors(reference_id, author_id) VALUES (?, ?)';
                    db.query(linkQuery, [referenceId, authorId], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            });
        });

        await Promise.all(authorPromises);

        res.status(200).send({ message: 'Entry added successfully', reference_id: referenceId });
    } catch (err) {
        console.error('Error processing entry:', err);
        res.status(500).send('Error processing entry');
    }

});


//..............................................................................................
// Endpoint to handle deletion of entries
app.delete('/delete-entry/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Delete associated records from the reference_authors table
        const deleteReferenceAuthorsQuery = `
            DELETE FROM reference_authors WHERE reference_id = ?
        `;
        await new Promise((resolve, reject) => {
            db.query(deleteReferenceAuthorsQuery, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        // Delete the entry from the reference table
        const deleteReferenceQuery = `
            DELETE FROM reference WHERE reference_id = ?
        `;
        await new Promise((resolve, reject) => {
            db.query(deleteReferenceQuery, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        //Delete the entry from the authors table
        const deleteAuthorsQuery = `
            DELETE FROM authors WHERE author_id NOT IN (SELECT author_id FROM reference_authors)
        `;
        await new Promise((resolve, reject) => {
            db.query(deleteAuthorsQuery, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        res.status(200).send({ message: 'Entry deleted successfully' });
    } catch (err) {
        console.error('Error deleting entry:', err);
        res.status(500).send({ message: 'Error deleting entry' });
    }
});


//..............................................................................................
// Endpoint to handle retrieving an entry from the database in Bibtex format
app.get('/get-bibtex/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //Query to get the bibtex entry from the database with it's associated data
        //and join them with the reference table
        const queryEntry = `
            SELECT r.type, r.reference_id, r.title, r.publisher, r.year, r.volume, r.issue, r.pages, r.doi,
            GROUP_CONCAT(a.name SEPARATOR ', ') AS authors
            FROM reference r
            JOIN reference_authors ra ON r.reference_id = ra.reference_id
            JOIN authors a ON ra.author_id = a.author_id
            WHERE r.reference_id = ?
            GROUP BY r.reference_id
        `;
        const results = await new Promise((resolve, reject) => {
            db.query(queryEntry, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).send({ message: 'Entry not found' });
        }

        // Format the result as a BibTeX entry
        const entry = results[0];
        const bibtexEntry = `@${entry.type}{${entry.reference_id},
  author = {${entry.authors}},
  title = {${entry.title}},
  publisher = {${entry.publisher}},
  year = {${entry.year}},
  volume = {${entry.volume}},
  issue = {${entry.issue}},
  pages = {${entry.pages}},
  doi = {${entry.doi}}
}`;
        // console.log("The Bib entry being sent is: ", bibtexEntry)
        // Send the BibTeX entry as a response
        res.status(200).send(bibtexEntry);
    } catch (err) {
        console.error('Error retrieving BibTeX entry:', err);
        res.status(500).send({ message: 'Error retrieving BibTeX entry' });
    }
});


//..............................................................................................
// Endpoint to handle retrieving all authors from the database to display existing authors and data
app.get('/get-authors', async (req, res) => {
    try {
        //query to get all the authors names, title and year of work from the database
        // and join them with the reference table
        const queryauthorsData = `
            SELECT r.reference_id, r.title, r.year, GROUP_CONCAT(a.name SEPARATOR ', ') AS authors
            FROM reference r
            JOIN reference_authors ra ON r.reference_id = ra.reference_id
            JOIN authors a ON ra.author_id = a.author_id
            GROUP BY r.reference_id
            
        `;
        const results = await new Promise((resolve, reject) => {
            db.query(queryauthorsData, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        
        res.status(200).send(results);
    } catch (err) {
        console.error('Error retrieving authors data in /get-authors endpoint:', err);
        res.status(500).send({ message: 'Error retrieving authors data' });
    }
});

//..............................................................................................
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

