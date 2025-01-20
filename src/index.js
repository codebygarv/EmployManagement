import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider >,
)
