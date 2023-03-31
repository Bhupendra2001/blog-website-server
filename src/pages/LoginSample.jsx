import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./Login.css";
import Write from "./Write";
const LoginSample = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      alert("Error --> " + err.response.data);
      setErr(err.response.data);
    }
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
                required
              />
              <label>username</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                required
              />
              <label>password</label>
            </div>

            <button onClick={handleSubmit}>log in</button>
            {err && <p id="a">{err}</p>}
            <div className="register">
              <p>
                Don't have an accounte? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginSample;
