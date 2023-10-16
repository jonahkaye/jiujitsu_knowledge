const sqlite3 = require('sqlite3').verbose();

// Create a new database or connect to an existing one
let db = new sqlite3.Database('./knowledgeGraph.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create the Nodes table
db.run(`CREATE TABLE IF NOT EXISTS Nodes (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    IsSubmissionPosition BOOLEAN NOT NULL,
    Description TEXT,
    Tag TEXT
)`, (err) => {
    if (err) {
        console.error("Error creating Nodes table", err.message);
    } else {
        console.log("Nodes table created or already exists.");
    }
});

// Create the Edges table
db.run(`CREATE TABLE IF NOT EXISTS Edges (
    Source INTEGER,
    Target INTEGER,
    Condition TEXT,
    Description TEXT,
    Weight REAL,
    FOREIGN KEY(Source) REFERENCES Nodes(ID),
    FOREIGN KEY(Target) REFERENCES Nodes(ID),
    UNIQUE(Source, Target, Condition, Description, Weight)
)`, (err) => {
    if (err) {
        console.error("Error creating Edges table", err.message);
    } else {
        console.log("Edges table created or already exists.");
    }
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Database connection closed.');
});
