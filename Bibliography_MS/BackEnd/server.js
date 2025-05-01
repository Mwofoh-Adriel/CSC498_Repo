// Description: This is a simple Express server that connects to a MySQL database and handles form submissions for adding
//  bibliographic entries. It uses the mysql package to interact with the database and body-parser middleware to parse
//  incoming JSON requests.
// The server listens on port 3001 and has an endpoint '/add-entry' that accepts POST requests with bibliographic data.
// The data is inserted into the 'reference' table, and the authors are inserted into the 'authors' table.
//  If an author already exists, it updates the author ID.
// It also links the reference ID and author ID in the 'reference_authors' table.
//  The server responds with success or error messages based on the database operations.


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

// Endpoint to handle form submissions
app.post('/add-entry', async (req, res) => {
    // Extract data from the request body

    const { authors, title, type, year, volume, issue, pages, doi } = req.body;

    try {
        const referenceQuery = `
            INSERT INTO reference (title, type, year, volume, issue, pages, doi)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const referenceResult = await new Promise((resolve, reject) => {
            db.query(referenceQuery, [title, type, year, volume, issue, pages, doi], (err, result) => {
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

    // try {
    //     const referenceId = /* logic to insert into the database and get the ID */;
    //     res.status(200).send({ message: 'Entry added successfully', reference_id: referenceId });
    //   } catch (error) {
    //     console.error('Error adding entry:', error);
    //     res.status(500).send({ message: 'Error adding entry' });
    //   }
});


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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



