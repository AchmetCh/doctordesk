import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const ToastSuccessful = () => toast("Login Successful!");
const ToastFailed = () => toast("Login Failed! Please try again.");

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const apiUrl = "http://localhost:8000";
  const apiOnline = "https://doctordesk.onrender.com";

const handleSubmit = async (e) => {
  e.preventDefault();
  const credentials = { username, password };
  try {
    const response = await axios.post(`${apiOnline}/api/login`, credentials);
    console.log(response.data.token);

    toast.success("Login Successful!", {
      onClose: () => {
       
        localStorage.setItem("token", response.data.token);
        navigate("/");
        window.location.reload()
      },
    });
  } catch (error) {
    ToastFailed();
    console.log(error);
    console.log("test");
  }
};

  return (
    <div className="container">
      <main className="imgForm">
        <div className="img">
          <img src="https://as2.ftcdn.net/v2/jpg/00/49/82/59/1000_F_49825930_uOTi1tSc6gk8N8QNelAiSxUY5lxSRETB.jpg" />
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
      </main>
      <Outlet/>
      <ToastContainer autoClose={1000}/>
    </div>
  );
};

export default Login;


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const credentials = { username, password };
//   try {
//     const response = await axios.post(`${apiOnline}/api/login`, credentials);
//     console.log(response.data.token);

//     localStorage.setItem("token", response.data.token);
//     ToastSuccessful();
//     setTimeout(() => navigate('/'), 1000);
//   } catch (error) {
//     ToastFailed();
//     console.log(error);
//     console.log("test");
//   }
// };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const credentials = { username, password };
//   try {
//     const response = await axios.post(`${apiOnline}/api/login`, credentials);
//     console.log(response.data.token);

//     toast.success("Login Successful!", {
//       onClose: () => {
//         navigate("/");
//         localStorage.setItem("token", response.data.token);
       
//       },
//     });
//   } catch (error) {
//     ToastFailed();
//     console.log(error);
//     console.log("test");
//   }
// };