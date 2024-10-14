import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import {Provider} from "react-redux";
import store from "./store/store.js"
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      ,
    </GoogleOAuthProvider>
  </Provider>
);
