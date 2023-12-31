import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

export default function Summary({ booking, setBooking, setStep }) {
  useEffect(() => {
    fetchingExtras();
    fetchingLocations();
  }, []);

  const [extras, setExtras] = useState([]);
  const [locationObject, setLocationObject] = useState([]);

  const fetchingExtras = async () => {
    const res = await fetch(`http://localhost:7777/api/extras`);
    const data = await res.json();
    setExtras(data);
  };

  const fetchingLocations = async () => {
    const res = await fetch(`http://localhost:7777/api/locations`);
    const data = await res.json();
    setLocationObject(
      data.find((locationFromDb) => locationFromDb.name == booking.location)
    );
  };

  const totalPassengers = (booking) => {
    if (booking.morning && booking.afternoon) {
      return (
        locationObject.price_base +
        locationObject.price_day * booking.passengers
      );
    }
    if (booking.morning) {
      return (
        locationObject.price_base +
        locationObject.price_morning * booking.passengers
      );
    }
    if (booking.afternoon) {
      return (
        locationObject.price_base +
        locationObject.price_afternoon * booking.passengers
      );
    }
  };

  const totalExtras = (booking) => {
    let total = 0;
    let itemsNames = [];
    for (const [key, value] of Object.entries(booking.extras)) {
      if (extras.length) {
        const extraPrice =
          extras.find((extra) => extra.name == key).price * value;
        total += extraPrice;
        itemsNames.push(`${value} x ${key} - £${extraPrice}`);
      }
    }
    return [total, itemsNames];
  };

  const extrasData = totalExtras(booking);
  const totalCostForPassengers = totalPassengers(booking);
  const totalTrip = totalCostForPassengers + extrasData[0];

  return (
    <OrderList>
      <SummaryPage>
        <SummaryTitle>Summary</SummaryTitle>
        <SummaryBlock>
          <TitleBlock>
            <UnitTitle>{locationObject.name}</UnitTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ color: "#2c7172" }}>
                {locationObject.english_name}
              </h3>
              <OrderList>base price - £{locationObject.price_base}</OrderList>
              <OrderList>
                {booking.passengers} passenger
                {booking.passengers == 1 ? "" : "s"} - £
                {totalCostForPassengers - locationObject.price_base}
              </OrderList>
            </div>
          </TitleBlock>
          <UnitPrice>£{totalCostForPassengers}</UnitPrice>
        </SummaryBlock>
        <Underline />

        <SummaryBlock>
          <TitleBlock>
            <UnitTitle>Extras</UnitTitle>
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
          <Button
            title="back"
            color="#144c74"
            action={() => {
              setStep(2);
            }}
          />
          <Button
            title={"Checkout"}
            color="#2c7172"
            action={() => {
              setBooking({ ...booking, total: totalTrip });
              setStep(4);
            }}
          ></Button>
        </ButtonContainer>
      </SummaryPage>
    </OrderList>
  );
}

const SummaryPage = styled.div`
  padding: 12vh 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  /* width: 100%;
  max-width: 1000px; */
`;

const SummaryTitle = styled.h1`
  align-self: center;
  font-size: 52px;
  color: #144c74;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const SummaryBlock = styled.div`
  display: flex;
  align-self: center;
  width: 95vw;
  justify-content: space-between;
  align-items: end;
  @media (min-width: 800px){ 
    max-width: 1000px;
  }

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
  @media (min-width: 800px){ 
    max-width: 1000px;
  }
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
  gap: 2rem;
`;

