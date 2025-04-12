import express , { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors'

const app = express();
app.use(cors());
const PORT = 3000;

// Load the JSON data
const readingsPath = path.resolve(__dirname, 'data', 'daily_stoic_readings.json');
const readings = JSON.parse(fs.readFileSync(readingsPath, 'utf8'));

// Define the endpoint
app.get('/api/reading', (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow the React app's origin
  console.log(req);
  const date = req.query.date as string;

  if (!date) {
    return res.status(400).json({ error: 'Date query parameter is required.' });
  }

  // Extract MM-DD from YYYY-MM-DD
  const match = date .match(/^\d{4}-(\d{2}-\d{2})$/);
  if (!match) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
  }

  const mmdd = match[1];
  const reading = readings[mmdd];

  if (!reading) {
    return res.status(404).json({ error: 'Reading not found for the given date.' });
  }

  res.json(reading);
});

// Start the server
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
