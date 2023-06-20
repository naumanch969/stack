import React from 'react';
import "./index.css"
import App from "./App"
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

// setting up a store
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import reducers from './reducers'
import thunk from "redux-thunk"
import { ContextProvider } from "./contexts/ContextProvider"


const store = createStore(reducers, compose(applyMiddleware(thunk)))

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>    {/* react-redux */}
    <ContextProvider>         {/* context-api */}
      <BrowserRouter>         {/* react-router-dom */}
        <GoogleOAuthProvider clientId='403911982205-39e2mt4fktk7c2htqtgvq3r2oqh8hjnq.apps.googleusercontent.com'>{/* google-authentication */}
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ContextProvider>
  </Provider>
);
