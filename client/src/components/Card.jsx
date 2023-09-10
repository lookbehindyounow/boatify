import styled from "styled-components";
import Button from "./Button";

export default function Card({ destination, setStep, setBooking, imageRef }) {
  return (
    <>
      <CardBlock
        style={{
          backgroundImage: `url(${imageRef})`,
          backgroundSize: `cover`,
        }}
      >
        <Title>{destination.name}</Title>
        <BottomBlock>
          <Button
            title={"Book Now"}
            action={() => {
              setBooking({ location: destination.name });
              setStep(1);
            }}
          ></Button>
          <p
            style={{
              color: `#ffffff`,
              textShadow: `-1px 1px 0 black, 1px 1px 0 black, 1px -1px 0 black,
    -1px -1px 0 black`,
            }}
          >
            from
          </p>
          <Price>£{destination.price_morning}</Price>
        </BottomBlock>
      </CardBlock>
    </>
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
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 15px;
  color: #144c74;
  background-color: #f0f8fa;
  border-radius: 10px;
  border: 2px solid #64b2d4;
  padding: 3px;
  display: flex;
  justify-content: center;
  width: fit-content;
`;

const BottomBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Price = styled.h3`
  font-size: 55px;
  color: #2f86c5;
  text-shadow: -1px 1px 0 black, 1px 1px 0 black, 1px -1px 0 black,
    -1px -1px 0 black;
`;
