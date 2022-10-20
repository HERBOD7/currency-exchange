import React from 'react';

const HistoryTable = (props) => {
  const { rates, currency } = props;

  const changeDateFormat = (date) => {
    const now = new Date(date);
    return now.toLocaleDateString();
  };

  const TableRows = () => {
    const ratesKey = Object.keys(rates);
    const rowList = ratesKey.map((date, index) => {
      const localeDate = changeDateFormat(date);
      const rate = rates[date][currency];
      return (
        <tr key={index}>
          <td className="pl-3 py-3 ta-left font-body-text color-default">
            {localeDate}
          </td>
          <td className="py-3 ta-left font-body-text color-default">{rate}</td>
        </tr>
      );
    });
    return <>{rowList}</>;
  };

  return (
    <table className="Convert__table">
      <thead>
        <tr>
          <th className="pl-3 py-3 ta-left color-header font-body-text fw-400">
            Date
          </th>
          <th className="py-3 ta-left color-header font-body-text fw-400">
            Exchange rate
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRows />
      </tbody>
    </table>
  );
};

export default HistoryTable;
