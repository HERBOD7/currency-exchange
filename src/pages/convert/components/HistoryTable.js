import React from 'react';

const HistoryTable = (props) => {
  const { rates } = props;
  const TableRows = () => {
    const ratesKey = Object.keys(rates);
    const rowList = ratesKey.map((rate, index) => {
      return (
        <tr key={index}>
          <td className="pl-3 py-3 ta-left font-body-text color-default">
            {rate.split('-').join('/')}
          </td>
          <td className="py-3 ta-left font-body-text color-default">
            {rates[rate].USD}
          </td>
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
