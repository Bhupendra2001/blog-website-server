import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./Drop.css";

function Dropdown() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="cont">
      <div>
        <img
          onClick={() => setOpen(!open)}
          src={"https://wallpapercave.com/dwp1x/wp4645248.jpg"}
          alt=""
        />
        {open && (
          <div className="userDetails">
            <ul>
              <li>Name : {currentUser?.username}</li>
            </ul>

            <ul>
              <li>Email : {currentUser?.email}</li>
            </ul>

            <ul>
              <Link className="links" to="/write">
                Edit : Write
              </Link>
            </ul>

            <div>
              <ul>
                <Link className="links" to="/create">
                  {" "}
                  Create blog
                </Link>
              </ul>
            </div>

            <div>
              <ul>
                <li className="lid">
                  {" "}
                  {currentUser ? (
                    <span onClick={logout}> Logout </span>
                  ) : (
                    <Link className="links" to="/login">
                      {" "}
                      Login{" "}
                    </Link>
                  )}{" "}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
