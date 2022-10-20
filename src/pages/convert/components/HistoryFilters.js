import React, { useState, useEffect } from 'react';

const HistoryFilters = (props) => {
  const { changeHistoryDuration } = props;
  const [historyDuration, setHistoryDuration] = useState(7);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const changeDuration = (e) => {
    const selectedDuration = e.target.value;
    setHistoryDuration(selectedDuration);
  };

  useEffect(() => {
    const calculateDuration = (duration) => {
      const date = new Date();
      const end = date.toISOString().split('T')[0];
      setEndDate(end);
      date.setDate(date.getDate() - duration);
      const start = date.toISOString().split('T')[0];
      setStartDate(start);
    };
    calculateDuration(historyDuration);
  }, [historyDuration]);

  useEffect(() => {
    changeHistoryDuration(startDate, endDate);
  }, [changeHistoryDuration, endDate, startDate]);

  return (
    <div className="flex mt-5 Convert__view-filters">
      <div className="flex flex-col">
        <label className="font-body-text color-header">Duration</label>
        <select
          name="duration"
          className="Convert__duration py-1"
          defaultChecked="7"
          onChange={changeDuration}
        >
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
        </select>
      </div>
      <div className="flex items-end Convert__view">
        <div className="mr-4">
          <input type="radio" id="table" name="view" value="table" />
          <label htmlFor="table">Table</label>
        </div>

        <div>
          <input type="radio" id="chart" name="view" value="chart" />
          <label htmlFor="chart">Chart</label>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilters;
