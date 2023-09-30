import React, { useEffect, useState } from "react";
import "./converter.css";

const Converter = () => {
  // Estados para almacenar la cifra ingresada y las monedas seleccionadas.
  const [monedas, setMonedas] = useState([]);
  const [moneda1, setMoneda1] = useState("USD");
  const [moneda2, setMoneda2] = useState("EUR");
  const [monto, setMonto] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/currencies`)
      .then((resp) => resp.json())
      .then((data) => {
        setMonedas(Object.keys(data));
      });
  }, [moneda1]);

  useEffect(() => {
    setMonto("");
    setResult("");
  }, [moneda1, moneda2]);

const handleConvert = () => {
  if (moneda1 !== moneda2) {
    const host = 'api.frankfurter.app';
    fetch(
      `https://${host}/latest?amount=${monto}&from=${moneda1}&to=${moneda2}`
    )
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Error: No se pudo obtener los datos.');
        }
        return resp.json();
      })
      .then((data) => {
        if (data && data.rates && data.rates[moneda2]) {
          setResult(data.rates[moneda2]);
        } else {
          throw new Error('Error: No se pudo obtener los datos.');
        }
      })
      .catch((error) => {
        setResult(error.message);
      });
  }
};



  return (
    <div className="converter-main">
      <div className="tilte">
        <h1>Money Converter</h1>
      </div>
      <div className="select-container">
        <select
          value={moneda1}
          name="moneda-1"
          id="moneda-1"
          onChange={(e) => setMoneda1(e.target.value)}
        >
          {monedas.map((moneda) => (
            <option key={moneda} value={moneda}>
              {moneda}
            </option>
          ))}
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <select
          value={moneda2}
          name="moneda-2"
          id="moneda-2"
          onChange={(e) => setMoneda2(e.target.value)}
        >
          {monedas.map((moneda) => (
            <option key={moneda} value={moneda}>
              {moneda}
            </option>
          ))}
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div className="inputs-container">
        <input
          className=""
          type="text"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <p className="">
          {moneda2}:{result}
        </p>
      </div>
      <div>
        <button onClick={handleConvert}>Convertir</button>
      </div>
    </div>
  );
};

export default Converter;