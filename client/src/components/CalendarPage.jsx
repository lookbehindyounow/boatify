import { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "/static/Calendar.css";
import CardPageStyle from "./CardPageStyle";
import Button from "./Button";
import Page from "./Page";

function CalendarPage({ booking, setBooking, setStep, prices }) {
  const [value, setValue] = useState(new Date());
  const [takenDates, setTakenDates] = useState([]);
  const [fullyTakenDates, setFullyTakenDates] = useState([]);
  const [buttonColours, setButtonColours] = useState({
    Morning: null,
    Afternoon: null,
    "Full day": null,
  });

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
              if (date.morning && date.afternoon) {
                return true;
              }
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

  useEffect(() => {
    const selected = `${value.getFullYear()}-${
      value.getMonth() + 1
    }-${value.getDate()}`;
    const todaysBooking = takenDates.filter((slot) => slot.date == selected)[0];
    if (todaysBooking) {
      todaysBooking.morning &&
        setButtonColours({
          Morning: "grey",
          Afternoon: "#2f86c5",
          "Full day": "grey",
        });
      todaysBooking.afternoon &&
        setButtonColours({
          Morning: "#2f86c5",
          Afternoon: "grey",
          "Full day": "grey",
        });
    } else {
      setButtonColours({ Morning: null, Afternoon: null, "Full day": null });
    }
    const { morning, afternoon, ...rest } = booking;
    setBooking({ ...rest, date: value });
    console.log(booking);
  }, [value]);

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
        <h2
          style={{ fontSize: "35px", color: "#64b2d4" }}
          onClick={() => console.log(booking)}
        >
          It's time to rig it up
        </h2>
        <CardPageStyle>
          <h4 style={{ marginBottom: "20px" }}>Pick your date</h4>
          <CalendarPageStyle>
            <Calendar
              minDate={new Date()}
              value={value}
              tileDisabled={tileDisabled}
              onChange={(e) => {
                setValue(e);
              }}
            />
          </CalendarPageStyle>
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              gap: "10px",
              maxWidth: "100%",
            }}
          >
            <Button
              title="Morning"
              price={`£${prices[3]} base + £${prices[0]} per person`}
              colour={buttonColours}
              action={() => {
                setButtonColours({
                  Morning: "#2c7172",
                  Afternoon:
                    buttonColours["Afternoon"] == "grey" ? "grey" : null,
                  "Full day":
                    buttonColours["Full day"] == "grey" ? "grey" : null,
                });
                setBooking({ ...booking, morning: true, afternoon: false });
                console.log({ ...booking, morning: true, afternoon: false });
              }}
            />
            <Button
              title="Afternoon"
              price={`£${prices[3]} base + £${prices[1]} per person`}
              colour={buttonColours}
              action={() => {
                setButtonColours({
                  Morning: buttonColours["Morning"] == "grey" ? "grey" : null,
                  Afternoon: "#2c7172",
                  "Full day":
                    buttonColours["Full day"] == "grey" ? "grey" : null,
                });
                setBooking({ ...booking, morning: false, afternoon: true });
                console.log({ ...booking, morning: false, afternoon: true });
              }}
            />
            <Button
              title="Full day"
              price={`£${prices[3]} base + £${prices[2]} per person`}
              colour={buttonColours}
              action={() => {
                setButtonColours({
                  Morning: buttonColours["Morning"] == "grey" ? "grey" : null,
                  Afternoon:
                    buttonColours["Afternoon"] == "grey" ? "grey" : null,
                  "Full day": "#2c7172",
                });
                setBooking({ ...booking, morning: true, afternoon: true });
                console.log({ ...booking, morning: true, afternoon: true });
              }}
            />
          </div>
        </CardPageStyle>
        <div style={{ display: "flex", gap: "1rem", marginTop: "5px" }}>
          <Button
            title="back"
            colour="#144c74"
            action={() => {
              setStep(0);
              setBooking({});
              console.log(`after back: ${booking}`);
            }}
          />
          <Button
            title="next"
            colour={booking.morning || booking.afternoon ? "#2f86c5" : "grey"}
            action={() => setStep(2)}
          />
        </div>
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
