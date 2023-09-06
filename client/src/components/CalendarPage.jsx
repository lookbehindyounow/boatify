import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "../../public/Calendar.css";
import { useEffect } from "react";

function CalendarPage() {
  const location = useLocation();
  const destination = location.state;

  const [newBooking, setNewBooking] = useState({
    date: "",
    slot: "",
    extras: [],
  });

  const [value, setNewValue] = useState(new Date());

  const setBooking = () => {
    setNewBooking({
      date: value,
      slot: "",
      extras: [],
    });
  };

    useEffect(() => {
  setBooking()
  }, [value])

  console.log("🚀 ~ value:", value);
  console.log("🚀 ~ booking_value:", newBooking);

  return (
    <>
      <Page>
        <h2 style={{ fontSize: "35px", color: "#64b2d4" }}>
          It's time to rig it up
        </h2>
        <CardPageStyle>
          <h4 style={{ marginBottom: "20px" }}>Pick your date</h4>
          <CalendarPageStyle>
            <Calendar value={value} onChange={setNewValue} />
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

const CardPageStyle = styled.div`
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  border: solid 2px #2f86c5;
  border-radius: 20px;
  width: 90vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
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
