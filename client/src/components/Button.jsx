import React from 'react'
import styled from 'styled-components'

export default function Button({title}) {
  return (
    <>
    <ButtonBasic>{title}</ButtonBasic>
    </>
  )
}

const ButtonBasic = styled.button`
  background-color: #64b2d4;
  color: #f0f8fa;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 20px;
  width: 130px;
`

