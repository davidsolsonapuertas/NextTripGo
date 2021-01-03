import React from 'react';
import { DateRangePicker } from 'react-date-range';
import { Dispatch, SetStateAction } from 'react';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface IProps {
  setDates: Dispatch<SetStateAction<object>>;
  dates: object;
  setRanges: Dispatch<SetStateAction<object>>;
}

function Daterangepicker({ setDates, dates, setRanges }: IProps) {
  const handleSelect = (ranges: any) => {
    setDates({
      ...dates,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
    setRanges(ranges.selection);
  };

  return (
    <div>
      <DateRangePicker ranges={[dates]} onChange={handleSelect} />
    </div>
  );
}

export default Daterangepicker;
