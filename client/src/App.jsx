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
import Page from "./components/Page";
import CardPageStyle from "./components/CardPageStyle";

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
            <Register setStep={setStep} setUser={setUser} />
          </>
        );
      case -2:
        return (
          <>
            <Account
              setStep={setStep}
              user={user}
              setUser={setUser}
              setOrder={setOrder}
            />
          </>
        );
      case -3:
        return (
          <>
            <Order setStep={setStep} order={order} />
          </>
        );

      case 0:
        return (
          <>
            <Hero>
              <div>
                <div2>
                  <h2>AHOY!</h2>
                  <h3>All hands on deck.</h3>
                  <br />
                  <Button
                    title="Book Now"
                    colour="white"
                    action={() =>
                      document
                        .getElementById("bottomOfDaPage")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  />
                </div2>
                <img src="static/boat_img.png" />
              </div>
            </Hero>
            <Cards
              destinations={destinations}
              setStep={setStep}
              setBooking={setBooking}
            />
            <p id="bottomOfDaPage"></p>
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
            <Checkout
              booking={booking}
              setBooking={setBooking}
              setStep={setStep}
              user={user}
            />
          </>
        );
      case 5:
        return (
          <>
            <Page>
              <CardPageStyle>
                <h2 style={{ color: "#2f86c5" }}>
                  Thank you for your booking!
                </h2>
                <h2 style={{ color: "#2f86c5" }}>
                  Your order id is {booking._id}
                </h2>
              </CardPageStyle>
              <Button title="Home" colour="#2c7172" action={() => setStep(0)} />
            </Page>
          </>
        );
    }
  };

  return (
    <>
      <Nav>
        <div>
          <div2>
            <img src="static/logo.svg" onClick={() => setStep(0)} />
            <h1>Boatify</h1>
          </div2>
          {step == 0 ? (
            <img
              src={
                user ? "static/account_icon.png" : "static/register_icon.png"
              }
              onClick={() => setStep(user ? -2 : -1)}
            />
          ) : null}
        </div>
      </Nav>
      <div>{renderSwitch(step)}</div>
      <Footer>
        <div>
          <h3 style={{ color: "#f0f8fa", fontSize: "20px" }}>
            Making memories, one wave at a time.
          </h3>
          <img src="static/logo-inverted.png" />
        </div>
      </Footer>
    </>
  );
}

export default App;

const Nav = styled.nav`
  height: 12vh;
  background-color: #f0f8fa;
  z-index: 1;
  position: fixed;
  width: 100%;
  div {
    justify-content: space-between;
    display: flex;
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
    div2 {
      display: flex;
      align-items: center;
      h1 {
        color: #144c74;
        font-size: 40px;
      }
    }
    img {
      height: 8.4vh;
      border-radius: 50%;
      margin: 1.8vh;
    }
  }
`;

const Hero = styled.div`
  padding-top: 12vh;
  background-color: #64b2d4;
  width: 100%;
  height: 50vh;
  margin-bottom: 10px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
    div2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      h2 {
        font-size: 50px;
      }
      @media (min-width: 1000px) {
        button {
          display: none;
        }
      }
    }
    img {
      height: 20vh;
    }
    @media (min-width: 800px) {
      div2 {
        h2 {
          font-size: 80px;
        }
        h3 {
          font-size: 30px;
        }
      }
      img {
        height: 30vh;
      }
    }
  }
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #144c74;
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
    height: 12vh;
    h3 {
      margin-left: 1.8vh;
    }
    img {
      height: 8.4vh;
      border-radius: 50%;
      margin: 1.8vh;
    }
  }
`;
