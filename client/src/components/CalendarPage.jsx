import { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "../../public/Calendar.css";
import CardPageStyle from "./CardPageStyle";
import Button from "./Button";

function CalendarPage({ booking, setBooking, setStep }) {
  const [value, setNewValue] = useState(new Date());
  const [takenDates, setTakenDates] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7777/api/orders")
      .then((res) => res.json())
      .then((data) =>
        setTakenDates(
          data
            .filter((datum) => {
              console.log(datum);
              console.log(
                value,
                datum,
                datum.location == booking.location && datum.date > value
              );
              return datum.location == booking.location && datum.date > value;
            })
            .map((match) => {
              location: match.location;
              morning: match.morning;
              afternoon: match.afternoon;
            })
        )
      );
    //Here we need to find in the api which days are free for that destination
  }, []);
  return (
    <>
      <Page>
        <h2 style={{ fontSize: "35px", color: "#64b2d4" }}>
          It's time to rig it up
        </h2>
        <br/>
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
          <div style={{display:"flex", width:"100%", marginTop:"5px", gap:"5px", justifyContent:"space-between"}}>
            <Button title="Morning" price="£12 per person" action={()=>setBooking({...booking,morning:true})}/>
            <Button title="Afternoon" price="£300 per person" action={()=>setBooking({...booking,afternoon:true})}/>
            <Button title="Full day" price="15p per person" action={()=>setBooking({...booking,morning:true,afternoon:true})}/>
          </div>
        </CardPageStyle>
        <Button title="next" action={()=>setStep(2)}/>
      </Page>
    </>
  );
}
export default CalendarPage;

const Page = styled.div`
  height: 100vh;
  padding-top: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const CalendarPageStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;
