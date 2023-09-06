import styled from "styled-components";
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Button from "./components/Button";
import CalendarPage from "./components/CalendarPage";
import Summary from "./components/Summary";
import Extras from "./components/Extras";

function App() {
  useEffect(() => {
    fetching();
  }, []);

  const [destinations, setDestinations] = useState([]);
  const [booking, setBooking] = useState({});
  const [step, setStep] = useState(0);

  const fetching = async () => {
    const collection = "locations";
    const res = await fetch(`http://localhost:7777/api/${collection}`);
    const data = await res.json();
    setDestinations(data);
  };

  const renderSwitch = (step) => {
    switch (step) {
      default:
        return (
          <>
            <p style={{paddingTop:"12vh"}}>there's no switch for this case</p>
            <img style={{width:"80vw",height:"50vw"}}
              src="https://www.shutterstock.com/shutterstock/photos/2057698184/display_1500/stock-vector-face-palm-emoji-sad-emoticon-with-facepalm-gesture-shaking-my-head-d-stylized-vector-icon-2057698184.jpg"/>
          </>
        );

      case 0:
        return (
          <>
            <Hero>
              <div>
                <h2>AHOY!</h2>
                <h3>All hands on deck.</h3>
                <br />
                <Button title="Book Now" colour="white"/>
              </div>
              <img src="static/boat_img.png" />
            </Hero>
            <Cards
              destinations={destinations}
              setStep={setStep}
              setBooking={setBooking}
            />
          </>
        );
      case 1:
        return (
          <>
            <CalendarPage
              booking={booking}
              setBooking={setBooking}
              setStep={setStep}
            />
          </>
        );
      case 2:
        return (
          <>
            <Extras
              booking={booking}
              setBooking={setBooking}
              setStep={setStep}
            />
          </>
        );
      case 3:
        return (
          <>
            <Summary
              booking={booking}
              setBooking={setBooking}
              setStep={setStep}
            />
          </>
        );
    }
  };

  return (
    <>
      <Nav>
        <img src="static/logo.png" />
        <h1>Boatify</h1>
      </Nav>
      {renderSwitch(step)}
    </>
  );
}

export default App;

//2f86c5 main text
//64b2d4 hero/secondary text
//f0f8fa bg off white
//2c7172 uhhh green
//144c74 higher contrast main

const Nav = styled.nav`
  display: flex;
  position: fixed;
  align-items: center;
  background-color: #f0f8fa;
  width: 100%;
  height: 12vh; // this
  img {
    border-radius: 50%;
    height: 70%; // times (100% - this)/2
    margin: 1.8vh; // is how I've decided this (so it has the same vertical & horizontal margins)
  }
  h1 {
    color: #2f86c5;
  }
`;

const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #64b2d4;
  height: 50vh;
  padding-top: 12vh;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    h2 {
      font-size: 50px;
    }
  }
  img {
    height: 40%;
  }
`;
