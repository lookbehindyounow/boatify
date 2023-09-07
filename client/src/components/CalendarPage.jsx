import { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "/static/Calendar.css";
import CardPageStyle from "./CardPageStyle";
import Button from "./Button";
import Page from "./Page";

function CalendarPage({ booking, setBooking, setStep }) {
  const [value, setNewValue] = useState(new Date());
  const [takenDates, setTakenDates] = useState([]);
  const [fullyTakenDates, setFullyTakenDates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7777/api/orders/find_dates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: booking.location }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTakenDates(data);
        setFullyTakenDates(
          data
            .filter((date) => {
              for (let i = 0; i < data.length; i++) {
                if (data[i].date == date.date && date != data[i]) {
                  return true;
                }
              }
            })
            .map((dat) => dat.date)
            .filter((date, i, array) => i == array.indexOf(date))
            .map((date) => new Date(date))
        );
      });
  }, []);

  const tileDisabled = ({ date }) => {
    return fullyTakenDates.find(
      (dDate) =>
        dDate.getDate() == date.getDate() &&
        dDate.getFullYear() == date.getFullYear() &&
        dDate.getMonth() == date.getMonth()
    );
  };
  return (
    <>
      <Page>
        <h2 style={{ fontSize: "35px", color: "#64b2d4" }}>
          It's time to rig it up
        </h2>
        <br />
        <CardPageStyle>
          <h4 style={{ marginBottom: "20px" }}>Pick your date</h4>
          <CalendarPageStyle>
            <Calendar
              minDate={new Date()}
              value={value}
              tileDisabled={tileDisabled}
              onChange={(e) => {
                setBooking({ ...booking, date: e });
              }}
            />
          </CalendarPageStyle>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginTop: "5px",
              gap: "5px",
              justifyContent: "space-between",
            }}
          >
            <Button
              title="Morning"
              price="£12 per person"
              action={() => setBooking({ ...booking, morning: true })}
            />
            <Button
              title="Afternoon"
              price="£300 per person"
              action={() => setBooking({ ...booking, afternoon: true })}
            />
            <Button
              title="Full day"
              price="15p per person"
              action={() =>
                setBooking({ ...booking, morning: true, afternoon: true })
              }
            />
          </div>
        </CardPageStyle>
        <Button title="next" action={() => setStep(2)} />
      </Page>
    </>
  );
}
export default CalendarPage;

const CalendarPageStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;
