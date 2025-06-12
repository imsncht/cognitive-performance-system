import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// ===================================================================
// !! THIS IS THE FIX !!
// This line imports the stylesheet and enables all the Tailwind CSS classes.
import './index.css'
// ===================================================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
