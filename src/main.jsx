import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from '~/components/GlobalStyles'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GlobalStyles>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyles>
)
