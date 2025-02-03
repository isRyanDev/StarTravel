import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Services from './pages/Services';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`

  :root {
    --background: rgb(101, 121, 252);
    --primary-color: rgb(24, 30, 75);
    --secondary-color: rgb(255, 255, 255);
    --tertiary-color: rgb(41, 70, 255);
    --decore-color: rgb(255,241,218);
    --login-text-color: rgb(32,34,36);
  }

  * {
    margin: 0;
    padding: 0;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  body {
    margin: 0;
    padding: 0; 
    overflow-x: hidden;
    background: var(--background);
  }

  li {
    list-style: none;
  }

  ::-webkit-scrollbar {
    width: 12px;

  }

  ::-webkit-scrollbar-track {
    background-color: var(--tertiary-color); 
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 0.5rem;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/destinations" element={<Destinations/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
