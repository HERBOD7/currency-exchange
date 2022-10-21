import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../../helper/formatNumber';

const ExchangeResult = (props) => {
  const { amount, fromCurrency, toCurrency, result, rate } = props;
  const [reverseExchange, setReverseExchange] = useState();
  useEffect(() => {
    const reverseValue = (1 / rate).toFixed(6);
    setReverseExchange(reverseValue);
  }, [rate]);

  return (
    <div className="mt-10">
      <div className="font-page-title flex justify-center">
        <p className="color-header">
          {/* TODO: format currency */}
          {formatCurrency(amount)}
          <span className="mx-2">{fromCurrency}</span>=
        </p>
        <p className="color-accent">
          <span className="mx-2">{result}</span>
          {toCurrency}
        </p>
      </div>
      <p className="font-body-text color-header mt-8 ta-center">
        1<span className="ml-1">{fromCurrency}</span> = {rate}
        <span className="ml-1">{toCurrency}</span>
      </p>
      <p className="font-body-text color-header mt-2 ta-center">
        1<span className="ml-1">{toCurrency}</span> = {reverseExchange}
        <span className="ml-1">{fromCurrency}</span>
      </p>
    </div>
  );
};

export default ExchangeResult;
