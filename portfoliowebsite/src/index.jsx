import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import MouseEffects from './components/mouse-effects/MouseEffects'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MouseEffects />
    <App />
  </React.StrictMode>
) 