import Card from "./Card";
import styled from "styled-components";
import pollenca from "../images/s-illot.jfif";
import calaSanVicente from "../images/cala-sant-vicenc.jfif";
import calaPi from "../images/cala-pi-de-la-posada.jfif";

function Cards({ destinations, setStep, setBooking }) {
  const imageRef = [calaPi, calaSanVicente, pollenca];
  return (
    <>
      <CardsView>
        {destinations.map((destination, i) => (
          <Card
            key={i}
            destination={destination}
            setStep={setStep}
            setBooking={setBooking}
            imageRef={imageRef[i]}
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

  @media (min-width: 800px) {
    display: flex;
    flex-direction: row;
    max-width: 1000px;
  }
`;
