import React, { useEffect, useState } from 'react';
import './App.css';
import Chunk from './Chunk';

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(money_round(1));
  const [amountInFC, setAmountInFC] = useState(true);

  function money_round(amount) {
    return (Math.ceil(amount * 100) / 100).toFixed(2);
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(Object.keys(data.rates)[0])
        setExchangeRate(data.rates[Object.keys(data.rates)[0]])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  let toAmount, fromAmount;
  if (amountInFC) {
    fromAmount = amount;
    toAmount = money_round(amount * exchangeRate);
  } else {
    toAmount = amount;
    fromAmount = money_round(amount / exchangeRate);
  }

  return (
    <>
    <div className = "wrapper">
      <h1>Currency Converter</h1>
      <div name="cRow" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div>
          <Chunk
            currencyOptions={currencyOptions}
            selectCurrency={fromCurrency}
            onChangeCurrency={e => { setFromCurrency(e.target.value);}}
            amount={fromAmount}
            onChangeAmount={e => { setAmount(e.target.value); setAmountInFC(true) }}
          />
        </div>
        <div className="arrow" style={{ alignSelf: "center" }}>&harr;</div>
        <div>
          <Chunk
            currencyOptions={currencyOptions}
            selectCurrency={toCurrency}
            onChangeCurrency={e =>{ setToCurrency(e.target.value);}}
            amount={toAmount}
            onChangeAmount={e => { setAmount(e.target.value); setAmountInFC(false) }}
          />
        </div>
      </div>
    </div>
    <div className="instructions">
      <text>
        This currency converter is made by Junya Wang using React. The github repository is at https://github.com/junyawang02/currency_converter/tree/main.
        The exchange rates are pulled in real time from https://exchangeratesapi.io/.
        To use, please select your desired currencies and/or change the amount. The amount will update accordingly.
      </text>
      </div>
    </>
  );
}

export default App;
