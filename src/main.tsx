import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store.ts'
import { Provider as ReduxProvider } from 'react-redux'
import './index.css'
import './assets/fonts/fonts.css'
import { Desk } from './components/Desk/Desk'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Desk />
    </ReduxProvider>
  </StrictMode>,
)
