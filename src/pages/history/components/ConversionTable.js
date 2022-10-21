import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import storage from '../../../helper/storage';
import { ReactComponent as ViewIcon } from '../../../assets/icons/visibility.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';

const ConversionTable = (props) => {
  const historyStore = storage.getItem('history');
  const [conversionHistory, setConversionHistory] = useState(historyStore);

  const deleteExchangeHistory = (index) => {
    const history = [...conversionHistory];
    history.splice(index, 1);
    storage.setItem('history', history);
    setConversionHistory(history);
  };

  const TableRows = () => {
    const rowList = conversionHistory.map((exchange, index) => {
      const localeDate = exchange.date.split(', ');
      const date = localeDate[0];
      const time = localeDate[1].substring(0, 5);

      return (
        <tr key={index}>
          <td className="pl-3 py-3 ta-left font-body-text color-default">
            {date} @ {time}
          </td>
          <td className="py-3 ta-left font-body-text color-default">
            Converted an amount of
            <span className="px-1">{exchange.amountCurrency}</span>
            from
            <span className="px-1">{exchange.fromCurrency}</span>
            to
            <span className="pl-1">{exchange.toCurrency}</span>
          </td>
          <td className="pr-3 History__table-actions-wrapper">
            <div className="History__table-actions justify-between">
              <Link
                to={`/?amount=${exchange.amountCurrency}&from=${exchange.fromCurrency}&to=${exchange.toCurrency}`}
                className="History__table-action flex items-center font-body-text color-primary"
              >
                <ViewIcon className="mr-1" />
                View
              </Link>
              <button
                className="History__table-action flex items-center font-body-text color-warn"
                onClick={() => deleteExchangeHistory(index)}
              >
                <DeleteIcon className="mr-1" />
                Delete from history
              </button>
            </div>
          </td>
        </tr>
      );
    });
    return <>{rowList}</>;
  };

  return (
    <table className="History__table History__table--fit mt-5">
      <thead>
        <tr>
          <th className="pl-3 py-3 ta-left color-header font-body-text fw-400">
            Date
          </th>
          <th className="py-3 ta-left color-header font-body-text fw-400">
            Event
          </th>
          <th className="py-3 ta-left color-header font-body-text fw-400">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {conversionHistory && (
          <TableRows
            exchangeHistory={conversionHistory}
            deleteHistory={deleteExchangeHistory}
          />
        )}
      </tbody>
    </table>
  );
};

export default ConversionTable;
