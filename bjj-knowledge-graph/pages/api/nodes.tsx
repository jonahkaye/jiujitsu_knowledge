import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from 'sqlite3';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let db = new Database('./knowledgeGraph.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the SQLite database.');
    });

    let sql = `INSERT OR IGNORE INTO Nodes (ID, Name, IsSubmissionPosition, Description, Tag) VALUES (?, ?, ?, ?, ?)`;
    let params = [req.body.id, req.body.name, req.body.isSubmissionPosition, req.body.description, req.body.tag];

    db.run(sql, params, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Node inserted with rowid ${this.lastID}`);
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Database connection closed.');
    });

    res.status(200).json({ message: 'Node inserted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}