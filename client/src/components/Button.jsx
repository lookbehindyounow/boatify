import styled from "styled-components";

export default function Button({
  title,
  price="",
  colour="#2f86c5",
  action,
}) {
  if (colour=="grey" || (typeof colour=="object" && colour[title]=="grey")){
    action=null
  }
  return (
    <>
      <ButtonBasic colour={typeof colour=="object" ? colour[title] ? colour[title] : "#2f86c5" : colour} onClick={action}>
        <p>{title}</p>
        <p style={{fontSize:"11px"}}>{price}</p>
      </ButtonBasic>
    </>
  );
}

const ButtonBasic = styled.button`
  background-color: ${props=>props.colour};
  color: ${props=>props.colour=="white"?"#2f86c5":"white"};
  border-style: none;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 20px;
  width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
