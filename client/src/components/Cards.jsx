import React from "react";
import Card from "./Card";
import styled from 'styled-components'

function Cards({ destinations }) {
  return (
    <>
      <CardsView>
        {destinations.map((destination) => (
          <Card destination={destination} />
        ))}
      </CardsView>
    </>
  );
}

export default Cards;

const CardsView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`