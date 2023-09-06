import React from "react";
import styled from 'styled-components'

export default function Summary() {
  const booking = {
    name: "Cala Pi de la Posada",
    date: "20 Jun 2023",
    price_morning: 20,
    1: 25,
    2: 20,
    3: 35,
  };

  return (
    <>
      <SummaryPage>
        <h1>Summary</h1>
        <h3>Cala Pi de la Posada</h3>
        <p>Afternoon</p>
        <h3>Extras</h3>
        <p>
          Bacon Roll, Tea, Champagne, 4x Beers, Bottle of Vodka, Swimsuit,
          Sunglasses
        </p>
        <h2>Total</h2>
        <h1>355</h1>
        <button>Checkout</button>
      </SummaryPage>
    </>
  );
}

const SummaryPage = styled.div`
  margin-top: 12vh;
`