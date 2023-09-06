import styled from "styled-components"
import CardPageStyle from "./CardPageStyle";
import Button from "./Button";

function TimeOfDayPage({newBooking}){
	return <>
		<Page>
			<h2 style={{ fontSize: "35px", color: "#64b2d4" }}>
				Fair weather and following seas
			</h2>
			<CardPageStyle>
				<h4 style={{ marginBottom: "20px" }}>Pick your time</h4>
				<div style={{display:"flex", flexDirection:"column", gap:"20px", width:"fit-content"}}>
					<Button title={["£199","Morning"]} whiteButton={true} large={true}/>
					<Button title={["£299","Afternoon"]} whiteButton={true} large={true}/>
					<Button title={["£379","Full day"]} whiteButton={true} large={true}/>
				</div>
			</CardPageStyle>
		</Page>
	</>
}
export default TimeOfDayPage

const Page = styled.div`
    display: flex;
		height: 100vh;
    flex-direction: column;
    align-items: center;
		text-align: center;
    justify-content: space-around;
`