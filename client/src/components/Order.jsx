import CardPageStyle from "./CardPageStyle";
import Page from "./Page";
import Button from "./Button";

export default function Order({setStep, order}){
  return <>
    <Page style={{backgroundImage: `url(./src/images/${order.imageRef}.jfif)`, backgroundSize: "cover", backgroundPosition: "center bottom 40%"}}>
      {/* <img src={`./src/images/${order.imageRef}.jfif`} style={{width: "90%"}}/> */}
      <CardPageStyle style={{color: "#2f86c5"}}>
        <h3>{order.location}</h3>
        <p>Order id: {order._id}</p>
        <p>{order.email}</p>
        <p>{order.date}</p>
        <p>{order.morning? order.afternoon?"full day":"morning" : order.afternoon&&"afternoon"}</p>
        <p>{order.passengers} passenger{order.passengers!=1&&"s"}</p>
        {order.extras&&<><p>Extras:</p>
          {order.extras.map((extra,i)=><p style={{paddingLeft: "20px"}} key={i}>{extra.quantity} x {extra.name}</p>)}
        </>}
        <br/>
        <Button title="Delete order" color="coral" action={()=>{
          fetch(`http://localhost:7777/api/orders/${order._id}`, {method: "DELETE"})
          setStep(-2)
        }}/>
      </CardPageStyle>
      <Button title="back" color="#144c74" action={()=>setStep(-2)}/>
    </Page>
  </>
}
