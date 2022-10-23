import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const SparklinesChart = (props) => {
  const { values, currency } = props;
  const rateValues = Object.values(values);
  const chartData = rateValues.map((rate) => {
    return rate[currency];
  });
  return (
    <Sparklines data={chartData}>
      <SparklinesLine color="#404040" />
    </Sparklines>
  );
};

export default SparklinesChart;
