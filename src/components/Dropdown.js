import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./Drop.css";

function Dropdown() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const nevigate = useNavigate;

  function handleLogout() {
    logout(nevigate);
  }
  return (
    <div className="cont">
      <div>
        <img
          onMouseEnter={() => setOpen(!open)}
          src={"https://wallpapercave.com/dwp1x/wp4645248.jpg"}
          alt=""
        />
        {open && (
          <div className="userDetails">
            <ul>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <ion-icon
                  style={{ color: "blue", fontSize: "30px" }}
                  name="person-circle-outline"
                ></ion-icon>

                <p >{currentUser?.username}</p>
              </li>
            </ul>

            <ul>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginLeft : "20px"
                }}
              >
                <ion-icon
                  style={{ color: "blue", fontSize: "30px" }}
                  name="mail-unread-outline"
                ></ion-icon>
                <p>{currentUser?.email}</p>
              </li>
            </ul>

            {/* <ul>
              <li>
              <Link className="links" to="/write">
                <ion-icon
                  style={{ color: "blue", fontSize: "30px" }}
                  name="create-outline"
                ></ion-icon>
                : Write
              </Link>
              </li>
            </ul> */}

            <div  className="LoginLogout">
            
           { currentUser &&
             <ul style={{marginLeft : "25px"}}>
               
                <Link className="links" to="/create">
                <ion-icon
                 style={{ color: "blue", fontSize: "35px" }}
                name="create-outline"></ion-icon>
                  Create blog
                </Link>
            
              </ul>
           } 
            


            
              <ul  style={{marginLeft : "25px"}}>
                <li className="lid">
                  {" "}
                  {currentUser ? (
                    <span style={{display : "flex"}} onClick={handleLogout}> 
                    <ion-icon 
                    style={{ color: "blue", fontSize: "30px", marginRight : "10px" }}
                    name="log-out-outline"></ion-icon> <p>  logout</p>
                    </span>
                  ) : (
                    <Link className="links" to="/login">
                     
                     <ion-icon
                      style={{ color: "blue", fontSize: "35px" ,marginLeft : "20px"}}
                      name="log-in-outline"></ion-icon> <p>  login </p>
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
