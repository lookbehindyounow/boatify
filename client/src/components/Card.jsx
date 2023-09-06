import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Card({ destination }) {
  return (
    <CardBlock>
      <Title>{destination.name}</Title>
      <BottomBlock>
        <Button title={"Book Now"}></Button>
        <p>from</p>
          <Price>£{destination.price_morning}</Price>
      </BottomBlock>
    </CardBlock>
  );
}

const CardBlock = styled.div`
  width: 95vw;
  background-color: #f0f8fa;
  border-radius: 20px;
  border: 2px solid #64b2d4;
  padding-top: 10px;
  padding-left: 20px;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 15px;
  padding-right: 20px;
`;

const Title = styled.h2`
  margin-top: 15px;
  color: #144c74;
`;

const BottomBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Price = styled.h3`
  font-size: 55px;
  color: #2f86c5;
  
  `