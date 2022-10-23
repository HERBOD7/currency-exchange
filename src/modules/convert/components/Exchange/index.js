import React from 'react';
import ExchangeForm from './ExchangeForm';
import ExchangeResult from './ExchangeResult';
import ResultLoader from './ResultLoader';

const Exchange = (props) => {
  const {
    submitForm,
    fromCurrency,
    toCurrency,
    amountCurrency,
    result,
    rate,
    exchangeResult,
    isLoading,
  } = props;

  return (
    <>
      <ExchangeForm
        submitForm={submitForm}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amountCurrency={amountCurrency}
        isLoading={isLoading}
      />
      {!!result && !isLoading && (
        <ExchangeResult
          amount={exchangeResult.amount}
          fromCurrency={exchangeResult?.from}
          toCurrency={exchangeResult?.to}
          result={result}
          rate={rate}
        />
      )}
      {!result && !isLoading && <div className="Convert__empty-result"></div>}
      {result === null && !isLoading && (
        <div className="ta-center font-section-title color-warn">
          Exchange is invalid
        </div>
      )}
      {isLoading && <ResultLoader viewBox="0 0 400 60" className="mt-10" />}
    </>
  );
};

export default Exchange;
