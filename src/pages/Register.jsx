import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //console.log(inputs)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://blog-website-server-mongo.vercel.app/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>

        <div>
        <input
         style={{width : "340px"}}
         
          type="text"
          placeholder="username"
          name="username"
          required
          onChange={handleChange}
        />
        <ion-icon
        style={{color : "#13f9d6" , fontSize : "24px"}}
         name="person-add"></ion-icon>
        </div>

        <div>
        <input
         style={{width : "340px"}}
          type="email"
          required
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <ion-icon
         style={{color : "#13f9d6" , fontSize : "24px"}}
        name="mail-outline"></ion-icon>
        </div>

        <div>

        <input
         style={{width : "340px"}}
          type="password"
          required
          placeholder="password"
          name="password"
          onChange={handleChange}
          
        />
        <ion-icon 
         style={{color : "#13f9d6" , fontSize : "24px"}}
        name="lock-closed-outline"></ion-icon>
        </div>
        <button onClick={handleSubmit}>Register</button>
        {err && <p> {err}</p>}

        <span>
          Do you have an account? please{" "}
          <Link id="login" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
