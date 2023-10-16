import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from 'sqlite3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let db = new Database('./knowledgeGraph.db');

    let sql = `SELECT * FROM Edges`;

    try {
      const rows = await new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });

      res.status(200).json(rows);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).json({ message: 'Database error' });
      } finally {
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Database connection closed.');
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}