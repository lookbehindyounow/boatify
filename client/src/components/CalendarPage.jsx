import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "../../public/Calendar.css";
import { useEffect } from "react";
import CardPageStyle from "./CardPageStyle";

function CalendarPage({ booking, setBooking }) {
  const [value, setNewValue] = useState(new Date());
  let takenDates = [];

  useEffect(() => {
    fetch("http://localhost:7777/api/orders")
      .then((res) => res.json())
      .then(
        (data) =>
          (takendates = data.filter(
            (datum) => datum.location == booking.location
          ))
      );
    //Here we need to find in the api which days are free for that destination
  }, []);

  console.log("🚀 ~ value:", value);
  console.log("🚀 ~ booking_value:", newBooking);
  console.log(takenDates);

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
                setNewValue(value);
                setBooking({ ...booking, date: e.target.value });
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
