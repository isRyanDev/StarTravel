import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/Authentication/AuthContext';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Services from './pages/Services';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ManageAccount from './pages/ManageAccount';
import PrivateRoute from './routes/PrivateRoute';
import UnloggedRoute from './routes/UnloggedRoute';
import LoggedRoute from './routes/LoggedRoute';
import { NotifyProvider } from './hooks/Notify/NotifyContext';
import Notify from './components/Notify';
import { ApiProvider } from './hooks/ApiResponse/ApiContext';

const GlobalStyle = createGlobalStyle`

  :root {
    --background: rgb(101, 121, 252);
    --primary-color: rgb(24, 30, 75);
    --secondary-color: rgb(255, 255, 255);
    --tertiary-color: rgb(41, 70, 255);
    --decore-color: rgb(255,241,218);
    --login-text-color: rgb(32,34,36);
    --dashboard-secondary-color: rgb(72, 128, 255);
    --dashboard-border-color: rgb(213,213,213);
    --dashboard-background-color: rgba(245, 246, 250, 1);;
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
      <AuthProvider>
        <NotifyProvider>
          <ApiProvider>
            <Notify />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/destinations" element={<Destinations/>} />
              <Route path="/services" element={<Services/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/register" element={<LoggedRoute><Register/></LoggedRoute>} />
              <Route path='/manage-account' element={<UnloggedRoute><ManageAccount/></UnloggedRoute>} />
              <Route path="/*" element={<NotFound/>} />
            </Routes>
          </ApiProvider>
        </NotifyProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);