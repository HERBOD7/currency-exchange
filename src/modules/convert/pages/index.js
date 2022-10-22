import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatCurrency } from '../../../helper/formatNumber';
import storage from '../../../helper/storage';
import ExchangeForm from '../components/ExchangeForm';
import HistoryTable from '../components/HistoryTable';
import StatisticTable from '../components/StatisticTable';
import ExchangeResult from '../components/ExchangeResult';
import HistoryFilters from '../components/HistoryFilters';
import SparklinesChart from '../components/SparklineChart';
import './Convert.scss';

const Convert = (props) => {
  const [resultValue, setResultValue] = useState();
  const [rateValue, setRateValue] = useState();
  const [query, setQuery] = useState();
  const [rates, setRates] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [fromParam, setFromParam] = useState();
  const [toParam, setToParam] = useState();
  const [amountParam, setAmountParam] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [historyView, setHistoryView] = useState('table');

  const storeExchangeHistory = (from, to, amount) => {
    const exchange = [
      {
        fromCurrency: from,
        toCurrency: to,
        amountCurrency: amount,
        date: new Date().toLocaleString(),
      },
    ];
    if (storage.getItem('history')) {
      const history = storage.getItem('history');
      history.push(...exchange);
      storage.setItem('history', history);
    } else {
      storage.setItem('history', exchange);
    }
  };

  const setQueryParams = useCallback(
    (from, to, amount) => {
      setSearchParams({
        amount: amount,
        from: from,
        to: to,
      });
    },
    [setSearchParams]
  );

  //TODO: form validation
  const fetchExchangeHistory = (start, end, from, to) => {
    fetch(
      `https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=${from}&symbols=${to}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates);
      });
  };

  const convertCurrency = useCallback(
    // TODO: add placeholder loading
    (amount, from, to) => {
      const fetchExchange = (amount, from, to) => {
        fetch(
          `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`,
          {
            method: 'GET',
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // TODO: show invalid result
            const formattedResult = formatCurrency(data.result);
            const rate = data.info.rate;
            const queryInfo = data.query;
            setResultValue(formattedResult);
            setRateValue(rate);
            setQuery(queryInfo);
            storeExchangeHistory(
              queryInfo.from,
              queryInfo.to,
              queryInfo.amount
            );
            setQueryParams(queryInfo.from, queryInfo.to, queryInfo.amount);
          });
      };
      if (
        from !== query?.from ||
        to !== query?.to ||
        Number(amount) !== query?.amount
      ) {
        fetchExchange(amount, from, to);
        if (from !== query?.from || to !== query?.to) {
          fetchExchangeHistory(startDate, endDate, from, to);
        }
      }
    },
    [endDate, query, setQueryParams, startDate]
  );

  const changeDuration = useCallback(
    (start, end) => {
      if (query && (start !== startDate || !startDate)) {
        fetchExchangeHistory(start, end, query.from, query.to);
      }
      setStartDate(start);
      setEndDate(end);
    },
    [query, startDate]
  );

  useEffect(() => {
    if (searchParams.get('amount') && startDate && endDate) {
      const amount = searchParams.get('amount');
      const from = searchParams.get('from');
      const to = searchParams.get('to');
      setFromParam(from);
      setToParam(to);
      setAmountParam(amount);
      convertCurrency(amount, from, to);
    }
  }, [searchParams, startDate, endDate, convertCurrency]);

  const changeConversionHistoryView = (view) => {
    setHistoryView(view);
  };

  return (
    <div>
      <h2 className="font-page-title color-default">I want to convert</h2>
      <ExchangeForm
        submitForm={convertCurrency}
        fromCurrency={fromParam}
        toCurrency={toParam}
        amountCurrency={amountParam}
      />
      {resultValue ? (
        <ExchangeResult
          amount={query.amount}
          fromCurrency={query.from}
          toCurrency={query.to}
          result={resultValue}
          rate={rateValue}
        />
      ) : (
        <div className="Convert__empty-result"></div>
      )}
      <hr className="mt-10" />
      <div className="mt-5">
        <p className="font-section-title color-default fw-700">
          Exchange History
        </p>
        <HistoryFilters
          changeHistoryDuration={changeDuration}
          changeHistoryView={changeConversionHistoryView}
        />
        <div>
          {rates && historyView === 'table' && (
            <div className="mt-4 flex justify-between">
              <HistoryTable rates={rates} currency={query?.to} />
              <StatisticTable ratesList={rates} currency={query?.to} />
            </div>
          )}
        </div>
        {rates && historyView === 'chart' && (
          <div className="mt-5">
            <SparklinesChart values={rates} currency={query?.to} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Convert;
