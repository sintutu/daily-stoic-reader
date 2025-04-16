import React, { useState, useEffect } from 'react';
import DatePicker from '../components/DatePicker';
import CopyButton from '../components/CopyButton';

const getPacificDate = (): string => {
  const now = new Date();
  const pacificTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  );
  const year = pacificTime.getFullYear();
  const month = String(pacificTime.getMonth() + 1).padStart(2, '0');
  const day = String(pacificTime.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // YYYY-MM-DD
};

const DailyReading: React.FC = () => {
  const [date, setDate] = useState<string>(getPacificDate()); // Today's date in US Pacific Time
  const [reading, setReading] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReading(date); // Fetch reading whenever the date changes
  }, [date]);

  const fetchReading = async (selectedDate: string) => {
    try {
      console.log(`Making request to: http://localhost:3000/api/reading?date=${selectedDate}`)
      const response = await fetch(`http://localhost:3000/api/reading?date=${selectedDate}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setReading(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setReading(null);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1>Daily Ponderance</h1>

      {/* DatePicker with default date */}
      <DatePicker defaultDate={date} onDateChange={setDate} />

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Reading Display */}
      {reading ? (
        <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h2>{reading.theme}</h2>
          <h3>{reading.title}</h3>
          <blockquote>
            <p>{reading.quote}</p>
          </blockquote>
          <footer>- {reading.author} - {reading.citation}</footer>
          {/* Add the CopyButton here */}
          <CopyButton
            date={date}
            title={reading.title}
            quote={reading.quote}
            author={reading.author}
            citation={reading.citation}
          />
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default DailyReading;
