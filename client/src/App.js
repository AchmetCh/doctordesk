import './App.css';
import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SearchPatient from './components/SearchPatient';

function App() {
  const isLoggedIn = !!localStorage.getItem('token')

  return (
<Router>
      <div className="App"> 
        {isLoggedIn ? (
          <>
            <NavBar className="layout" />
            <Routes>
              <Route path="/searchpatient" element={<SearchPatient />} />
              <Route index element={<SearchPatient />} />
              {/* Add more routes here */}
            </Routes>
          </>
        ) : (
          <Routes>
           <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;

