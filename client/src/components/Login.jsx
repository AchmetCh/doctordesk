import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = "https://doctordesk.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const credentials = { username: username.trim(), password };

    try {
      const response = await axios.post(`${apiUrl}/api/login`, credentials);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful!", {
          onClose: () => {
            navigate("/");
            window.location.reload();
          },
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <main className="login-card">
        <div className="login-image">
          <img 
            src="https://as2.ftcdn.net/v2/jpg/00/49/82/59/1000_F_49825930_uOTi1tSc6gk8N8QNelAiSxUY5lxSRETB.jpg" 
            alt="Login illustration"
          />
        </div>
        
        <div className="login-form">
          <h2>Welcome </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </main>
      
      <Outlet />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;