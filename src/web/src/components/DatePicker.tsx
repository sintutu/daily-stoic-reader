import React, { useState } from 'react';

interface DatePickerProps {
  defaultDate: string; // Preloaded date from parent
  onDateChange: (newDate: string) => void; // Callback for when the date changes
}

const DatePicker: React.FC<DatePickerProps> = ({ defaultDate, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    onDateChange(newDate); // Notify parent about the change
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="datepicker">Select Date: </label>
      <input
        id="datepicker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
    </div>
  );
};

export default DatePicker;
