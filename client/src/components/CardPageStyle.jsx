import styled from "styled-components"

const CardPageStyle = styled.div`
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  border: solid 2px #2f86c5;
  border-radius: 20px;
  background-color: #f0f8fa;
  width: calc(100vw - 20px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media(min-width: 800px) { 
    width: 830px
  }
`;

export default CardPageStyle
