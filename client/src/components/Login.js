import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './login.css'

const ToastSuccessful = () => toast("Login Successful!");
const ToastFailed = () => toast("Login Failed! Please try again.");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 


  const navigate = useNavigate();
  const apiUrl = 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
  const credentials = { username, password }
  try {
    const response = await axios.post(`${apiUrl}/api/login`, credentials)
      console.log(response.data.token);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        ToastSuccessful();
        setTimeout(() => window.location.href = '/searchPatient', 1000);
      } else {
        ToastFailed();
      }
    } catch (error) {
        ToastFailed();
      console.log(error);
      console.log('test');
    }
  };
 


  return (
    <div className="container">
        <div className="imgForm">
        <div className="img">
            <img src="https://as2.ftcdn.net/v2/jpg/00/49/82/59/1000_F_49825930_uOTi1tSc6gk8N8QNelAiSxUY5lxSRETB.jpg"/>
        </div>
      <div className="form">

      <form onSubmit={handleSubmit}>
        <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
            <label>Password</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const ToastSuccessful = () => toast("Login Successful!");
// const ToastFailed = () => toast("Login Failed! Please try again.");

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this state

//   const navigate = useNavigate();
//   const apiUrl = 'http://localhost:8000';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const credentials = { username, password };
//     try {
//       const response = await axios.post(`${apiUrl}/api/login`, credentials);
//       console.log(response.data.token);
//       if (response.status === 200) {
//         localStorage.setItem("token", response.data.token);
//         ToastSuccessful();
//         setIsLoggedIn(true); 
//       } else {
//         ToastFailed();
//       }
//     } catch (error) {
//       ToastFailed();
//       console.log(error);
//       console.log('test');
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate('/searchpatient'); 
//     }
//   }, [isLoggedIn, navigate]); 

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;

