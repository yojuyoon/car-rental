'use client';

import { Controller, Control } from 'react-hook-form';
import DatePicker from 'react-datepicker';

interface DateRangePickerProps {
  name: string; // 예: "dateRange"
  control: Control<any>;
}

export default function DateRangePicker({
  name,
  control,
}: DateRangePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <DatePicker
          selectsRange
          startDate={field.value?.[0] || null}
          endDate={field.value?.[1] || null}
          onChange={(dates: [Date | null, Date | null]) =>
            field.onChange(dates)
          }
          dateFormat="dd/MM/yy"
          className="w-full p-2 border rounded"
          placeholderText="Select rental period"
          isClearable
        />
      )}
    />
  );
}
