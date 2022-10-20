import React, { useState, useEffect } from 'react';

const StatisticTable = (props) => {
  const { ratesList, currency } = props;
  const [lowest, setLowest] = useState();
  const [highest, setHighest] = useState();
  const [average, setAverage] = useState();

  useEffect(() => {
    const statistics = (rates) => {
      const ratesValue = Object.values(rates);
      let minValue = ratesValue[0][currency];
      let maxValue = ratesValue[0][currency];
      let sum = 0;
      for (let i = 0; i < ratesValue.length; i++) {
        if (ratesValue[i][currency] < minValue) {
          minValue = ratesValue[i][currency];
        } else if (ratesValue[i][currency] > maxValue) {
          maxValue = ratesValue[i][currency];
        }
        sum = sum + ratesValue[i][currency];
      }
      const average = (sum / ratesValue.length).toFixed(6);
      setLowest(minValue);
      setHighest(maxValue);
      setAverage(average);
    };
    statistics(ratesList);
  }, [currency, ratesList]);

  return (
    <table className="Convert__table Convert__table--fit ml-4">
      <thead>
        <tr>
          <th className="pl-3 py-3 ta-left color-header font-body-text fw-400">
            Statistic
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="pl-3 py-3 ta-left font-body-text color-default">
            Lowest
          </td>
          <td className="py-3 ta-left font-body-text color-default">
            {lowest}
          </td>
        </tr>
        <tr>
          <td className="pl-3 py-3 ta-left font-body-text color-default">
            Highest
          </td>
          <td className="py-3 ta-left font-body-text color-default">
            {highest}
          </td>
        </tr>
        <tr>
          <td className="pl-3 py-3 ta-left font-body-text color-default">
            Average
          </td>
          <td className="py-3 ta-left font-body-text color-default">
            {average}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatisticTable;
