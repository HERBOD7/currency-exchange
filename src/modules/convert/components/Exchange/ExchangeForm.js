import React, { useState, useEffect } from 'react';
import { ReactComponent as ChangeIcon } from '../../../../assets/icons/change.svg';
import { ReactComponent as LoadingIcon } from '../../../../assets/icons/loading.svg';

const ExchangeForm = (props) => {
  const { submitForm, fromCurrency, toCurrency, amountCurrency, isLoading } =
    props;
  const [amountValue, setAmountValue] = useState();
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();

  useEffect(() => {
    setAmountValue(amountCurrency);
    setFromValue(fromCurrency);
    setToValue(toCurrency);
  }, [fromCurrency, toCurrency, amountCurrency]);

  const revertCurrencies = (e) => {
    e.preventDefault();
    const fromCurrency = fromValue;
    setFromValue(toValue);
    setToValue(fromCurrency);
  };

  const submitExchange = (e) => {
    e.preventDefault();
    submitForm(amountValue, fromValue, toValue);
  };

  return (
    <form className="Convert__form mt-12">
      <div className="flex flex-col mr-5">
        <label htmlFor="amount" className="color-header font-body-text">
          Amount
        </label>
        <input
          name="amount"
          id="amount"
          type="number"
          min="1"
          placeholder="1"
          className="Convert__form-input py-1"
          defaultValue={amountValue}
          onChange={(e) => setAmountValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="from" className="color-header font-body-text">
          From
        </label>
        <input
          name="from"
          id="from"
          type="text"
          placeholder="EUR"
          className="Convert__form-input Convert__form-input-txt py-1"
          value={fromValue}
          maxLength="3"
          onChange={(e) => setFromValue(e.target.value.toUpperCase())}
        />
      </div>
      <div className="flex items-end justify-center">
        <button className="Convert__change-btn p-1" onClick={revertCurrencies}>
          <ChangeIcon />
        </button>
      </div>
      <div className="flex flex-col">
        <label htmlFor="to" className="color-header font-body-text">
          To
        </label>
        <input
          name="to"
          type="text"
          id="to"
          placeholder="USD"
          className="Convert__form-input Convert__form-input-txt py-1"
          value={toValue}
          maxLength="3"
          onChange={(e) => setToValue(e.target.value.toUpperCase())}
        />
      </div>
      <div className="flex items-end justify-center">
        <button
          className="Convert__convert-btn px-3 py-2 flex items-center justify-center"
          type="submit"
          onClick={submitExchange}
        >
          {isLoading ? <LoadingIcon /> : 'CONVERT'}
        </button>
      </div>
    </form>
  );
};

export default ExchangeForm;
