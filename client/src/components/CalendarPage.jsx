import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"
import styled from "styled-components"

function CalendarPage(){
  const [startDate, setStartDate] = useState(new Date())
  return <>
    <CalendarPageStyle>
      <h2 style={{fontSize: "35px", color: "#64b2d4"}}>It's time to rig it up</h2>
      <DatePicker inline selected={startDate} onChange={date => setStartDate(date)}/>
    </CalendarPageStyle>
  </>
}
export default CalendarPage

const CalendarPageStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88vh;
  justify-content: space-around;
  div{
    width: 100%;
    .react-datepicker__month{
      margin: 0;
      .react-datepicker__week{
        display: flex;
      }
    }
  }
`