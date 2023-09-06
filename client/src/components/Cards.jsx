import Card from "./Card";
import styled from "styled-components";

function Cards({ destinations, setStep, setBooking }) {
  return (
    <>
      <CardsView>
        {destinations.map((destination,i) => (
          <Card
            key={i}
            destination={destination}
            setStep={setStep}
            setBooking={setBooking}
          />
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
`;
