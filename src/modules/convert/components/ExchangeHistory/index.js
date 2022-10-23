import React, { useState } from 'react';
import HistoryFilters from './HistoryFilters';
import HistoryTable from './HistoryTable';
import StatisticTable from './StatisticTable';
import SparklinesChart from './SparklineChart';
import TableLoader from './TableLoader';

const ExchangeHistory = (props) => {
  const { changeHistoryDuration, rates, isLoading, exchangeResult, result } =
    props;
  const [historyView, setHistoryView] = useState('table');

  const changeConversionHistoryView = (view) => {
    setHistoryView(view);
  };

  return (
    <div className="mt-5">
      <p className="font-section-title color-default fw-700">
        Exchange History
      </p>
      <HistoryFilters
        changeHistoryDuration={changeHistoryDuration}
        changeHistoryView={changeConversionHistoryView}
      />
      <div>
        {result && rates && historyView === 'table' && !isLoading && (
          <div className="mt-4 flex justify-between">
            <HistoryTable rates={rates} currency={exchangeResult?.to} />
            <StatisticTable ratesList={rates} currency={exchangeResult?.to} />
          </div>
        )}
        {isLoading && historyView === 'table' && (
          <div className="mt-4 flex justify-between">
            <TableLoader viewBox="0 0 400 190" />
            <TableLoader viewBox="0 0 400 190" />
          </div>
        )}
      </div>
      {result && rates && historyView === 'chart' && !isLoading && (
        <div className="mt-5">
          <SparklinesChart values={rates} currency={exchangeResult?.to} />
        </div>
      )}
      {isLoading && historyView === 'chart' && (
        <div className="mt-5">
          <TableLoader viewBox="0 0 400 90" className="mt-5" />
        </div>
      )}
    </div>
  );
};

export default ExchangeHistory;
