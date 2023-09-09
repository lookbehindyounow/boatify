import styled from "styled-components";

export default function Button({
  title,
  price="",
  colour="#2f86c5",
  large = 0,
  action,
}) {
  if (colour=="grey" || (typeof colour=="object" && colour[title]=="grey")){
    action=null
  }
  return (
    <>
      <ButtonBasic colour={typeof colour=="object" ? colour[title] ? colour[title] : "#2f86c5" : colour} large={large} onClick={action}>
        {large?<>
          <span>{price}</span><span>{title}</span>
        </>:<>
          <p>{title}</p><p style={{fontSize:"11px"}}>{price}</p>
        </>}
      </ButtonBasic>
    </>
  );
}

const ButtonBasic = styled.button`
  background-color: ${props=>props.colour};
  color: ${props=>props.colour=="white"?"#2f86c5":"white"};
  border-style: none;
  padding: ${(props) => (props.large ? "15px" : "10px")};
  font-size: ${(props) => (props.large ? "25px" : "18px")};
  font-weight: ${(props) => (props.large ? "800" : "600")};
  border-radius: ${(props) => (props.large ? "20px" : "20px")};
  width: ${(props) => (props.large ? "100%" : "130px")};
  display: flex;
  ${props=>props.large&&props.price ? "gap: 20px" : "flex-direction: column"};
  align-items: center;
  justify-content: ${(props) =>
    typeof props.price && props.large ? "space-around" : "center"};
`;
