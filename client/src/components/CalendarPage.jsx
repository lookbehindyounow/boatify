import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "/static/Calendar.css";
import { useEffect } from "react";
import CardPageStyle from "./CardPageStyle";

function CalendarPage({ booking, setBooking, setStep }) {
  const [value, setNewValue] = useState(new Date());
  const [takenDates, setTakenDates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7777/api/orders/find_dates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: booking.location }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, []);

  return (
    <>
      <Page>
        <h2 style={{ fontSize: "35px", color: "#64b2d4" }}>
          It's time to rig it up
        </h2>
        <CardPageStyle>
          <h4 style={{ marginBottom: "20px" }}>Pick your date</h4>
          <CalendarPageStyle>
            <Calendar
              value={value}
              onChange={(e) => {
                setBooking({ ...booking, date: e });
              }}
            />
          </CalendarPageStyle>
          <p style={{ color: "#832929", paddingTop: "20px" }}>
            Morning only available{" "}
          </p>
        </CardPageStyle>
      </Page>
    </>
  );
}
export default CalendarPage;

const Page = styled.div`
  height: 100vh;
  border: solid 1px red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const CalendarPageStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  justify-content: space-around;
`;
