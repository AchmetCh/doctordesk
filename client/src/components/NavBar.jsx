import React from 'react'
import {Outlet, Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ToastSuccessful = () => toast("Logout successfuly");
const NavBar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        setTimeout(() => window.location.href = `/`,1000); 
        ToastSuccessful()
    }
  return (
    <div className='navbar'>
    <header>
     <nav className='nav'>
     <Link to="/" className='logo'> DoctorDesk</Link>
     <button onClick={handleLogout} className='logoutBtn'>Logout</button>
     </nav>
    </header>
    <Outlet />
    <ToastContainer/>
    </div>
  )
}

export default NavBar