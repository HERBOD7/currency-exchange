import React, { useState, useCallback } from 'react';
import storage from '../../helper/storage';
import ExchangeForm from './components/ExchangeForm';
import HistoryTable from './components/HistoryTable';
import StatisticTable from './components/StatisticTable';
import ExchangeResult from './components/ExchangeResult';
import HistoryFilters from './components/HistoryFilters';
import './Convert.scss';

const Convert = (props) => {
  const [resultValue, setResultValue] = useState();
  const [rateValue, setRateValue] = useState();
  const [query, setQuery] = useState();
  const [rates, setRates] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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

  //TODO: form validation
  const fetchExchange = (amount, from, to) => {
    fetch(
      `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedResult = new Intl.NumberFormat('en-IN').format(
          data.result
        );
        const rate = data.info.rate;
        const queryInfo = data.query;
        setResultValue(formattedResult);
        setRateValue(rate);
        setQuery(queryInfo);
        storeExchangeHistory(queryInfo.from, queryInfo.to, queryInfo.amount);
      });
  };

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

  const convertCurrency = (amount, from, to) => {
    fetchExchange(amount, from, to);
    fetchExchangeHistory(startDate, endDate, from, to);
  };

  const changeDuration = useCallback(
    (start, end) => {
      setStartDate(start);
      setEndDate(end);
      if (query) {
        fetchExchangeHistory(start, end, query.from, query.to);
      }
    },
    [query]
  );

  return (
    <div>
      <h2 className="font-page-title color-default">I want to convert</h2>
      <ExchangeForm submitForm={convertCurrency} />
      {resultValue && (
        <ExchangeResult
          amount={query.amount}
          fromCurrency={query.from}
          toCurrency={query.to}
          result={resultValue}
          rate={rateValue}
        />
      )}
      <hr className="mt-10" />
      <div className="mt-5">
        <p className="font-section-title color-default fw-700">
          Exchange History
        </p>
        <HistoryFilters changeHistoryDuration={changeDuration} />
        <div>
          {rates && (
            <div className="mt-4 flex justify-between">
              <HistoryTable rates={rates} currency={query.to} />
              <StatisticTable ratesList={rates} currency={query.to} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Convert;
