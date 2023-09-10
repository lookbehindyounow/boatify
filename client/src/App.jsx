import styled from "styled-components";
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Button from "./components/Button";
import CalendarPage from "./components/CalendarPage";
import Summary from "./components/Summary";
import Extras from "./components/Extras";
import Checkout from "./components/Checkout";
import Register from "./components/Register";
import Account from "./components/Account";
import Order from "./components/Order";

function App() {
  useEffect(() => {
    fetching();
  }, []);

  const [destinations, setDestinations] = useState([]);
  const [booking, setBooking] = useState({});
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(false);
  const [order, setOrder] = useState(0);

  const fetching = async () => {
    const res = await fetch("http://localhost:7777/api/locations");
    const data = await res.json();
    setDestinations(data);
  };

  const renderSwitch = (step) => {
    switch (step) {
      default:
        return (
          <>
            <p style={{ paddingTop: "12vh" }}>
              there's no switch for this case
            </p>
            <img
              style={{ width: "80vw", height: "50vw" }}
              src="https://www.shutterstock.com/shutterstock/photos/2057698184/display_1500/stock-vector-face-palm-emoji-sad-emoticon-with-facepalm-gesture-shaking-my-head-d-stylized-vector-icon-2057698184.jpg"
            />
          </>
        );
      case -1:
        return (
          <>
            <Register setStep={setStep} setUser={setUser}/>
          </>
        )
      case -2:
        return (
          <>
            <Account setStep={setStep} user={user} setUser={setUser} setOrder={setOrder}/>
          </>
        )
      case -3:
        return (
          <>
            <Order setStep={setStep} order={order}/>
          </>
        )

      case 0:
        return (
          <>
            <Hero>
              <div>
                <h2>AHOY!</h2>
                <h3>All hands on deck.</h3>
                <br />
                <Button title="Book Now" colour="white" />
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
        const thisLocation = destinations.filter(
          (destination) => destination.name == booking.location
        )[0];
        return (
          <>
            <CalendarPage
              booking={booking}
              setBooking={setBooking}
              setStep={setStep}
              prices={[
                thisLocation.price_morning,
                thisLocation.price_afternoon,
                thisLocation.price_day,
                thisLocation.price_base,
              ]}
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
      case 4:
        return (
          <>
            <Checkout booking={booking} setBooking={setBooking} setStep={setStep} user={user}/>
          </>
        );
      case 5:
        return (
          <>
            <div style={{paddingTop:"12vh"}}>thank you for booking here is your book id {booking._id}</div>
            <Button title="Home" colour="#2c7172" action={()=>setStep(0)}/>
          </>
        );
    }
  };

  return (
    <>
      <Desktop>
        <Container>
          <Nav>
            <img src="static/logo.svg" />
            <h1>Boatify</h1>
            {step == 0 ? (
              <img
                style={{ position: "absolute", marginLeft: "78%", ...(window.innerWidth >= 800 && { marginLeft: "92%" })}}
                // style={{position: "absolute", marginLeft: "calc(100vw - 10.2vh", borderRadius: "50%"}}
                src={user?"static/account_icon.png":"static/register_icon.png"}
                onClick={() => setStep(user?-2:-1)}
              />
            ) : null}
          </Nav>
          {renderSwitch(step)}
          <Footer>
            <div style={{width: "50%"}}><h3 style={{color: "#f0f8fa", fontSize: "20px"}}>Making memories, one wave at a time.</h3></div>
            <img style={{width: "70px"}} src="static/logo-inverted.png" />
          </Footer>
        </Container>
      </Desktop>
    </>
  );
}

export default App;

const Desktop = styled.div`
  @media (min-width: 800px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Container = styled.div`
  @media (min-width: 800px) {
    width: 1000px;
    heigth: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`;

const Nav = styled.nav`
            display: flex;
            position: fixed;
            align-items: center;
            background-color: #f0f8fa;
            width: 100%;
            height: 12vh; 
            img {
              border-radius: 50%;
            height: 70%; // times (100% - this)/2
            margin: 1.8vh; // is how I've decided this (so it has the same vertical & horizontal margins)
            }
            h1 {
              color: #144c74;
            font-size: 40px;
            };
            @media (min-width: 800px) { 
              width: 1000px
            }
            `;

const Hero = styled.div`
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: #64b2d4;
            height: 50vh;
            padding-top: 12vh;
            margin-bottom: 10px;
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
            @media (min-width: 800px) {
              width: 100%
  }
            `;

const Footer = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center;
  background-color: #144c74;
justify-content: space-around;
  width: 100%;
  height: 12vh;
  @media (min-width: 800px) {
    width: 1000px;
  }
`;
