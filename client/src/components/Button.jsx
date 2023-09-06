import styled from "styled-components";

export default function Button({
  title,
  price="",
  colour="#2f86c5",
  large = false,
  action,
}) {

  return (
    <>
      <ButtonBasic colour={colour} large={large} onClick={action}>
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
  color: ${props=>props.colour=="#2f86c5"?"white":"#2f86c5"};
  border-style: none;
  padding: ${(props) => (props.large ? "25px" : "10px")};
  font-size: ${(props) => (props.large ? "25px" : "18px")};
  font-weight: ${(props) => (props.large ? "800" : "600")};
  border-radius: ${(props) => (props.large ? "25px" : "20px")};
  width: ${(props) => (props.large ? "100%" : "130px")};
  display: flex;
  ${props=>props.large ? "gap: 20px" : "flex-direction: column"};
  align-items: center;
  justify-content: ${(props) =>
    typeof props.price && props.large ? "space-between" : "center"};
`;
