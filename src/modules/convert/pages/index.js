import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatCurrency } from '../../../helper/formatNumber';
import storage from '../../../helper/storage';
import Exchange from '../components/Exchange';
import ExchangeHistory from '../components/ExchangeHistory';
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
  const [historyIsLoading, setHistoryIsLoading] = useState(false);
  const [conversionIsLoading, setConversionIsLoading] = useState(false);

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

  const fetchExchangeHistory = (start, end, from, to) => {
    fetch(
      `https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=${from}&symbols=${to}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setHistoryIsLoading(false);
        setRates(data.rates);
      })
      .catch((error) => {
        setHistoryIsLoading(false);
      });
  };

  const convertCurrency = useCallback(
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
            setConversionIsLoading(false);
            let formattedResult;
            if (data.result !== null) {
              formattedResult = formatCurrency(data.result);
            } else {
              formattedResult = data.result;
            }
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
          })
          .catch((error) => {
            setConversionIsLoading(false);
          });
      };
      if (
        from !== query?.from ||
        to !== query?.to ||
        Number(amount) !== query?.amount
      ) {
        setConversionIsLoading(true);
        fetchExchange(amount, from, to);
        if (from !== query?.from || to !== query?.to) {
          setHistoryIsLoading(true);
          fetchExchangeHistory(startDate, endDate, from, to);
        }
      }
    },
    [endDate, query, setQueryParams, startDate]
  );

  const changeDuration = useCallback(
    (start, end) => {
      if (query && (start !== startDate || !startDate)) {
        setHistoryIsLoading(true);
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

  return (
    <div>
      <h2 className="font-page-title color-default">I want to convert</h2>
      <Exchange
        submitForm={convertCurrency}
        fromCurrency={fromParam}
        toCurrency={toParam}
        amountCurrency={amountParam}
        result={resultValue}
        rate={rateValue}
        exchangeResult={query}
        isLoading={conversionIsLoading}
      />
      <hr className="mt-10" />
      <ExchangeHistory
        changeHistoryDuration={changeDuration}
        rates={rates}
        isLoading={historyIsLoading}
        exchangeResult={query}
        result={resultValue}
      />
    </div>
  );
};

export default Convert;
