import { useEffect, useState } from "react";
import CardPageStyle from "./CardPageStyle";
import Page from "./Page"
import Button from "./Button";
import {
  PayPalScriptProvider,
  PayPalButtons
} from "@paypal/react-paypal-js";

export default function Checkout({booking,setBooking,setStep,user}) {
  const [email,setEmail] = useState(user?user.email:"")
  const [emailValid,setEmailValid] = useState(false)

  useEffect(()=>{
    if (
      email.split("@").length==2 && // is there one @
      email.split("@")[0] && // is there text before @
      email.split("@")[1].split(".").length>1 && // is there at least one . after @
      email.split("@")[1].split(".").every(text=>text) // is there text before & after every . after @
    ){
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  },[email])

  useEffect(()=>{
    if (emailValid){
      document.getElementsByClassName("paypal-buttons-disabled")[0].style.opacity=1
    }
  },[emailValid])

  const pay = ()=>{
    console.log("BOOKED")
    const {location,passengers,total,morning,afternoon,date,extras} = booking
    const databaseBooking = {email,location,passengers,price:total,date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}
    if (morning){
      databaseBooking.morning=true
    }
    if (afternoon){
      databaseBooking.afternoon=true
    }
    if (user){
      databaseBooking.userId=user._id
    }
    const bookingExtras=Object.keys(extras).map(key=>{return {name:key,quantity:extras[key]}})
    if (bookingExtras.length){
      databaseBooking.extras=bookingExtras
    }
    fetch("http://localhost:7777/api/orders/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(databaseBooking)
    })
      .then((res) => res.json())
      .then((data) => setBooking(data))
    setStep(5)
  }

  return <>
    <Page>
      <h2 style={{ fontSize: "35px", color: "#64b2d4", textAlign: "center" }}>
        Fair weather and following seas
      </h2>
      <CardPageStyle >
        <label onClick={pay} htmlFor="email" style={{color: "#144c74"}}>Please enter your email address:</label>
        <br/>
        <input  id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <br/>
        {emailValid?
          <p onClick={pay}>
            <PayPalScriptProvider >
              <PayPalButtons disabled={true}/>
            </PayPalScriptProvider>
          </p>
        :null}
      </CardPageStyle>
      <Button title="back" colour="#144c74" action={()=>setStep(3)}/>
    </Page>
  </>
}
