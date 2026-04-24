import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Echoes from './pages/Echoes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Echoes />
  </StrictMode>,
)
