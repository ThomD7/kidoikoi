import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.js'
import i18n from './i18n'
import { BrowserRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import { ListProvider } from './contexts/list-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ListProvider>
          <App />
        </ListProvider>
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>,
)
