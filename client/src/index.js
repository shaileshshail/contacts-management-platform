import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google'
const root = ReactDOM.createRoot(document.getElementById('root'));
const clientID="770257979923-qkr3nujqp9dgj84dlojsjel6kqlcu67p.apps.googleusercontent.com"
root.render(
  
  <BrowserRouter>
   <React.StrictMode>
    <GoogleOAuthProvider  clientId={clientID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
  </BrowserRouter>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
