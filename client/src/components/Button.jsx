import styled from "styled-components";

export default function Button({
  title,
  whiteButton = false,
  large = false,
  action,
}) {
  if (typeof title == "object") {
    console.log(title);
    title = title.map((text) => <span>{text}</span>);
    console.log(title);
  }

  return (
    <>
      <ButtonBasic whiteButton={whiteButton} large={large} onClick={action}>
        {title}
      </ButtonBasic>
    </>
  );
}

const ButtonBasic = styled.button`
  background-color: ${(props) => (props.whiteButton ? "white" : "#2f86c5")};
  color: ${(props) => (props.whiteButton ? "#2f86c5" : "white")};
  border-style: none;
  padding: ${(props) => (props.large ? "25px" : "10px")};
  font-size: ${(props) => (props.large ? "25px" : "18px")};
  font-weight: ${(props) => (props.large ? "800" : "600")};
  border-radius: ${(props) => (props.large ? "25px" : "20px")};
  width: ${(props) => (props.large ? "100%" : "130px")};
  display: flex;
  justify-content: ${(props) =>
    typeof props.title == "object" ? "space-between" : "center"};
  gap: 20px;
`;
