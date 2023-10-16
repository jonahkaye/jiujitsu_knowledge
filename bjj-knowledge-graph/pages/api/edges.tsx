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

    let sql = `INSERT INTO Edges (StartNodeID, EndNodeID, Condition, Description, Weight) VALUES (?, ?, ?, ?, ?)`;
    let params = [req.body.source, req.body.target, req.body.condition, req.body.description, req.body.weight];

    db.run(sql, params, function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(409).json({ message: 'Edge already exists' });
        } else {
          console.error(err.message);
          res.status(500).json({ message: 'Database error' });
        }
        return;
      }
      console.log(`Edge inserted with rowid ${this.lastID}`);
      res.status(200).json({ message: 'Edge inserted successfully' });
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Database connection closed.');
    });

    res.status(200).json({ message: 'Edge inserted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}