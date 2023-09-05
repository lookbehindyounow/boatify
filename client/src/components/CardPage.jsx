import React from 'react'
import { useLocation } from 'react-router-dom'

export default function CardPage() {

  const location = useLocation()
  const destination = location.state
  console.log(destination); 
  return (
    <div>{destination.name}</div>
  )
}
