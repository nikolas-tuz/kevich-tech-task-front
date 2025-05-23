import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as DateTimePickerMUI } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePickerMUI
          label="Basic date time picker"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '9999px' // Fully rounded
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}