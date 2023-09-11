import styled from "styled-components";

export default function Button({
  title,
  price="",
  color="#2f86c5",
  action,
}) {
  if (color=="grey" || (typeof color=="object" && color[title]=="grey")){
    action=null
  }
  return (
    <>
      <ButtonBasic color={typeof color=="object" ? color[title] ? color[title] : "#2f86c5" : color} onClick={action}>
        <p>{title}</p>
        <p style={{fontSize:"11px"}}>{price}</p>
      </ButtonBasic>
    </>
  );
}

const ButtonBasic = styled.button`
  background-color: ${props=>props.color};
  color: ${props=>props.color=="white"?"#2f86c5":"white"};
  border-style: none;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 20px;
  max-width: 130px;
  display: flex;
  flex-shrink: 4;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
