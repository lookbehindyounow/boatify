import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CalendarPage from './components/CalendarPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path:"/card/:id",
    element: <CalendarPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
