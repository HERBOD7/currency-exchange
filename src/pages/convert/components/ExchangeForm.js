import React, { useState } from 'react';
import { ReactComponent as ChangeIcon } from '../../../assets/icons/change.svg';

const ExchangeForm = (props) => {
  const { submitForm } = props;
  const [amountValue, setAmountValue] = useState(1);
  const [fromValue, setFromValue] = useState('EUR');
  const [toValue, setToValue] = useState('USD');

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
          className="Convert__form-input Convert__form-input-txt py-1"
          value={fromValue}
          maxLength="3"
          // ToDo: check toUpperCase is necessary or not
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
          className="Convert__form-input Convert__form-input-txt py-1"
          value={toValue}
          maxLength="3"
          // ToDo: check toUpperCase is necessary or not
          onChange={(e) => setToValue(e.target.value.toUpperCase())}
        />
      </div>
      <div className="flex items-end justify-center">
        <button
          className="Convert__convert-btn px-3 py-2"
          type="submit"
          onClick={submitExchange}
        >
          CONVERT
        </button>
      </div>
    </form>
  );
};

export default ExchangeForm;
