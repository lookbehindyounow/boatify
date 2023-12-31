import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Page from "./Page";
import Button from "./Button";
import CardPageStyle from "./CardPageStyle";

const ExtraLi = styled.li`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 10px;
  margin: 0 10px;
  background-color: white;
  border: 2px solid;
  border-color: #64b2d4;
  border-radius: 6px;
  width: calc(100% - 20px);
`;

export default function Extras({ booking, setBooking, setStep }) {
  const [allExtras, setAllExtras] = useState([]);
  const [bookingExtras, setBookingExtras] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7777/api/extras/")
      .then((res) => res.json())
      .then((data) => setAllExtras(data));
    setBooking({ ...booking, passengers: 1 });
  }, []);

  return (
    <>
      <Page>
        <h2 style={{ fontSize: "35px", color: "#64b2d4", textAlign: "center" }}>
          Drinks, friends, and ocean tides
        </h2>
        <CardPageStyle>
          <ul
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <ExtraLi key="passengers">
              <label htmlFor="passengers">
                <h2>Passengers</h2>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                placeholder={booking.passengers}
                onChange={(e) => {
                  if (e.target.value > 10) {
                    e.target.value = 10;
                  } else if (e.target.value < 0) {
                    e.target.value = 1;
                  }
                  if (Number(e.target.value)) {
                    setBooking({
                      ...booking,
                      passengers: Number(e.target.value),
                    });
                  }
                }}
              />
            </ExtraLi>
            {allExtras.map((extra, i) => (
              <ExtraLi key={i}>
                <label htmlFor={extra.name}>{extra.name}</label>
                <input
                  type="number"
                  defaultValue={bookingExtras[extra.name] ? bookingExtras[extra.name] : "0"}
                  min="0"
                  max="100"
                  onChange={(e) => {
                    if (e.target.value > 100) {
                      e.target.value = 100;
                    } else if (e.target.value < 0) {
                      e.target.value = 0;
                    }
                    // the following is to stop "bacon rolls": 0 being added to the booking
                    if (Number(e.target.value)) {
                      setBookingExtras({
                        ...bookingExtras,
                        [extra.name]: Number(e.target.value),
                      });
                    } else {
                      const { [extra.name]: toRemove, ...rest } = bookingExtras; // destructuring an object creates variables, which can't have dynamic names, so when destructuring an object with dynamic keys we have to explicitly define variable names, hence [extra.name]:toRemove
                      setBookingExtras(rest); // then setting booking to everything apart from the extra that was just set to 0
                    }
                  }}
                />
              </ExtraLi>
            ))}
          </ul>
        </CardPageStyle>
        <div style={{display: "flex", gap: "1rem"}}>
          <Button
            title="back"
            color="#144c74"
            action={() => {
              setStep(1);
            }}
          />
          <Button title="next" action={() => {
            setBooking({...booking,extras:bookingExtras})
            setStep(3)
          }} />
        </div>
      </Page>
    </>
  );
}
