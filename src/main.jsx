import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/useTheme';
import './i18n'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* v7_startTransition жалаушаларын қостық - ескертулер жоғалады */}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)