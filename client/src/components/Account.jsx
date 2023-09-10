import CardPageStyle from "./CardPageStyle"
import Page from "./Page"
import Button from "./Button"
import { useEffect, useState } from "react"

export default function Account({setStep, user, setUser}) {
  const [myOrders, setMyOrders] = useState([])

  useEffect(()=>{getMyOrders()},[])

  const getMyOrders = async () => {
    const res=await fetch("http://localhost:7777/api/orders")
    const orders=await res.json()
    // setMyOrders([orders.filter(order=>order.email==user.email||order.userId==user._id)])
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
        {myOrders.map((order,i)=><div key={i} style={{padding: "10px", border: "solid #144c74", borderRadius: "10px"}}>
          {order.location}
        </div>)}
        <Button title="Log out" action={()=>{
          setUser(false)
          setStep(0)
        }}/>
      </CardPageStyle>
      <Button title="back" colour="#144c74" action={()=>setStep(0)}/>
    </Page>
  </>
}