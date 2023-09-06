import styled from "styled-components";
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Button from "./components/Button";
import CalendarPage from "./components/CalendarPage";

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
        console.log("HAS THIS EVER HAPPENED TO YOU?")
        return (
          <>
            <Hero>
              <div>
                <h2>AHOY!</h2>
                <h3>All hands on deck.</h3>
                <br />
                <Button title="Book Now" colour="white"/>
              </div>
              <img src="public/boat_img.png" />
            </Hero>
            <Cards
              destinations={destinations}
              setStep={setStep}
              setBooking={setBooking}
            />
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
              <img src="public/boat_img.png" />
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
    }
  };

  return (
    <>
      <Nav>
        <img src="public/logo.png" />
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
