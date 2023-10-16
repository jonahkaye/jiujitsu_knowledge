// app/api/backup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), 'backup.json');

  // Read the file asynchronously
  const fileData = fs.readFileSync(filePath, 'utf8');

  // Parse the JSON data
  const data = JSON.parse(fileData);

  // Return the data as JSON
  res.status(200).json(data);
}