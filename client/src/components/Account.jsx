import CardPageStyle from "./CardPageStyle"
import Page from "./Page"
import Button from "./Button"
import { useEffect, useState } from "react"

export default function Account({setStep, user, setUser, setOrder}) {
  const [myOrders, setMyOrders] = useState([])

  useEffect(()=>{getMyOrders()},[])

  const getMyOrders = async () => {
    let res=await fetch("http://localhost:7777/api/orders")
    let data=await res.json()
    const orders=data.filter(order=>(order.email&&order.email==user.email)||(order.userId&&order.userId==user._id))
    console.log(orders,user)
    // if we put imageRef into locations collection in db
    // res=await fetch("http://localhost:7777/api/locations")
    // data=await res.json()
    // orders.forEach(order=>order.imageRef=data.find(location=>order.location==location.name).imageRef)
    orders.forEach(order=>order.imageRef=order.location.split(/ |'/).join("-").toLowerCase())
    setMyOrders(orders)
  }

  return <>
    <Page>
      <CardPageStyle style={{color: "#2f86c5"}}>
        <h2>Username: {user.username}</h2>
        <h2>Password: {user.password}</h2>
        <h2>Email: {user.email}</h2>
        <p>User id: {user._id}</p>
        <br/>
        {myOrders.map((order,i)=><div key={i} onClick={()=>{setOrder(order);setStep(-3)}} style={{
          padding: "10px", marginBottom: "10px", border: "solid #144c74", borderRadius: "10px", color: "white", width: "90%",
          backgroundImage: `url(./src/images/${order.imageRef}.jfif)`, backgroundSize: "cover", backgroundPosition: "center bottom 40%"
        }}>
          <h3>{order.location}</h3>
          <p>Order id: {order._id}</p>
          <p>{order.date}</p>
        </div>)}
        <Button title="Log out" action={()=>{
          setUser(false)
          setStep(0)
        }}/>
      </CardPageStyle>
      <Button title="back" color="#144c74" action={()=>setStep(0)}/>
    </Page>
  </>
}
