import styled from 'styled-components'

export default function Button({title,whiteButton=false}) {
  return (
    <>
    <ButtonBasic whiteButton={whiteButton}>{title}</ButtonBasic>
    </>
  )
}

const ButtonBasic = styled.button`
  background-color: ${props=>props.whiteButton?"#f0f8fa":"#2f86c5"};
  color: ${props=>props.whiteButton?"#2f86c5":"#f0f8fa"};
  border-style: none;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 20px;
  width: 130px;
`