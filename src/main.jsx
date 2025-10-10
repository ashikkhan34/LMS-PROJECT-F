import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/router.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster 
    toastOptions={{
    style: {
      background: '#1f2937', // dark bg
      color: '#facc15',       // text yellow
      fontWeight: 'bold',
    },
  }}
    position="top-right" reverseOrder={false} />
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
