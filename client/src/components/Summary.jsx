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
  console.log(booking);

  const fetchingExtras = async () => {
    const res = await fetch(`http://localhost:7777/api/extras`);
    const data = await res.json();
    setExtras(data);
  };

  const fetchingLocations = async () => {
    const res = await fetch(`http://localhost:7777/api/locations`);
    const data = await res.json();
    setLocationObject(data.find(locationFromDb=>locationFromDb.name==booking.location))
  };

  const totalPassengers = (booking) => {
    if (booking.morning&&booking.afternoon){
      return locationObject.price_base + locationObject.price_day * booking.passengers
    }
    if (booking.morning){
      return locationObject.price_base + locationObject.price_morning * booking.passengers
    }
    if (booking.afternoon){
      return locationObject.price_base + locationObject.price_afternoon * booking.passengers
    }
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
          <h2 style={{color:"#2c7172"}}>{locationObject.name}</h2>
        </SummaryBlock>
        <SummaryBlock>
          <h3 style={{color:"#2c7172"}}>{locationObject.english_name}</h3>
        </SummaryBlock>
        <br/>
        <SummaryBlock>
          <TitleBlock>
            <UnitTitle>{booking.passengers} passengers</UnitTitle>
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
          <Button title={"Checkout"}
            large={true}
            action={() => {
              setBooking({ ...booking, total: totalTrip})
              setStep(4)
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
