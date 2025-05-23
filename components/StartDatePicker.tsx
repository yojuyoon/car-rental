'use client';

import { Control, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

interface StartDatePickerProps {
  name: string;
  control: Control<any>;
}

export default function StartDatePicker({
  name,
  control,
}: StartDatePickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field }) => (
        <DatePicker
          {...field}
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => field.onChange(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 border rounded"
          placeholderText="Select start date"
        />
      )}
    />
  );
}
