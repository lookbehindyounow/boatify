import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

export default function Summary({ booking, setBooking }) {
  useEffect(() => {
    fetching();
  }, []);

  const [extras, setExtras] = useState([]);
  console.log(booking);

  const fetching = async () => {
    const res = await fetch(`http://localhost:7777/api/extras`);
    const data = await res.json();
    setExtras(data);
  };

  //const booking = {
  //name: "Cala Pi de la Posada",
  //english_name: "Formentor Beach",
  //date: "2024-06-01",
  //passengers: 2,
  //base_price: 10,
  //morning: true,
  //price_morning: 20,
  //["Bacon Roll"]: 5,
  //["Bucket of Beers"]: 2,
  //["Champagne"]: 3,
  //};

  const totalPassengers = (booking) => {
    let total = 0;
    for (const [key, value] of Object.entries(booking)) {
      if (key == ("price_morning" || "price_afternoon" || "price_full_day")) {
        total = value * booking.passengers + booking.base_price;
      }
    }
    return total;
  };

  const totalExtras = (booking) => {
    let total = 0;
    let itemsNames = [];
    for (const [key, value] of Object.entries(booking)) {
      extras.map((extra) => {
        if (extra.name == key) {
          total += extra.price * value;
          itemsNames.push([String(`${value} x `), key]);
        }
      });
    }
    return [total, itemsNames];
  };

  const extrasData = totalExtras(booking);
  const totalCostForPassengers = totalPassengers(booking);
  const totalTrip = totalCostForPassengers + extrasData[0];

  return (
    <>
      <SummaryPage>
        <SummaryTitle>Summary</SummaryTitle>
        <SummaryBlock>
          <TitleBlock>
            <UnitTitle>{booking.name}</UnitTitle>
            <OrderList>{booking.english_name}</OrderList>
          </TitleBlock>
          <UnitPrice>£{totalCostForPassengers}</UnitPrice>
        </SummaryBlock>
        <Underline />

        <SummaryBlock>
          <TitleBlock>
            <UnitTitle>Extras</UnitTitle>
            {/* {extrasData[0].length ? (extrasData[0].map((item) => <OrderList>{item}</OrderList>)) : null } */}
            {extrasData[1].map((item) => (
              <OrderList>{item}</OrderList>
            ))}
          </TitleBlock>
          <UnitPrice>£{extrasData[0]}</UnitPrice>
        </SummaryBlock>
        <Underline />
        <TotalTitle>Total</TotalTitle>
        <TotalCost>£{totalTrip}</TotalCost>
        <ButtonContainer>
          <Button title={"Checkout"}
           large={true}
           action={() => {
            setBooking({ ...booking, total: totalTrip})
          }}
            ></Button>
        </ButtonContainer>
      </SummaryPage>
    </>
  );
}

const SummaryPage = styled.div`
  padding-top: 12vh;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
`;

const SummaryTitle = styled.h1`
  align-self: center;
  font-size: 52px;
  color: #144c74;
  margin-top: 10vh;
  margin-bottom: 50px;
`;

const SummaryBlock = styled.div`
  display: flex;
  align-self: center;
  width: 95vw;
  justify-content: space-between;
  align-items: end;
`;
const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const UnitPrice = styled.h2`
  font-size: 35px;
  color: #144c74;
`;
const Underline = styled.div`
  height: 1px;
  background-color: #2c7172;
  width: 95vw;
  margin-top: 5px;
  align-self: center;
  margin-bottom: 25px;
`;

const UnitTitle = styled.h3`
  color: #2c7172;
`;
const OrderList = styled.p`
  color: #2c7172;
`;

const TotalTitle = styled.h2`
  font-size: 45px;
  margin-bottom: 30px;
  margin-top: 30px;
  align-self: center;
  color: #2c7172;
`;
const TotalCost = styled.h1`
  font-size: 70px;
  color: #64b2d4;
  align-self: center;
  padding-bottom: 50px;
`;
const ButtonContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
`;
