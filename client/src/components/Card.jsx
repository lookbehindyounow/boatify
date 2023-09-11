import styled from "styled-components";
import Button from "./Button";

export default function Card({ destination, setStep, setBooking, imageRef }) {

  return (
    <>
      <CardBlock
        style={{
          backgroundImage: `url(${imageRef})`,
          backgroundSize: `cover`,
          backgroundPosition: `center bottom 35%`,
          opacity: 0.88
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
          <div>
            <p
              style={{
                color: `#ffffff`,
                textShadow: `-1px 1px 0 #144c74, 1px 1px 0 #144c74, 1px -1px 0 #144c74,
      -1px -1px 0 #144c74`,
              }}
            >
              from
            </p>
            <Price>£{destination.price_morning}</Price>
          </div>
        </BottomBlock>
      </CardBlock>
    </>
  );
};

const CardBlock = styled.div`
  width: 95vw;
  border-radius: 20px;
  box-shadow: 3px 3px 6px #64b2d4;
  padding: 10px;
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
  opacity: 0.8;
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
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
const Price = styled.h3`
  font-size: 55px;
  opacity: 0.96;
  color: #0c304a;
  text-shadow: -0.8px 0.8px 0 rgba(240, 248, 250, 0.7),
    -0.8px 0.8px 0 rgba(240, 248, 250, 0.7),
    -0.8px 0.8px 0 rgba(240, 248, 250, 0.7),
    -0.8px 0.8px 0 rgba(240, 248, 250, 0.7);
`;
