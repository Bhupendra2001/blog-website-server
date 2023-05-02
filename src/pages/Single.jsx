import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
//import logo from "../components/img/bhupendra.jpg";
const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog-website-server-mongo.vercel.app/api/posts/${postId}`);
        //  console.log(res.data.data)
        setPost(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async (props) => {
    try {
      let res = await axios.delete(`https://blog-website-server-mongo.vercel.app/api/posts/${postId}/${post.userId}` ,
      {  headers : { 'Authorization' : `Barear  ${currentUser?.token}`} }
      );
      console.log(post.userId);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="single">
      <div className="content">
        <img style={{ margin: "30px"}} src={post.img} alt="" />
        <div className="user">
   
        <h1> {post.title}</h1>
        <h4> {post.descp}</h4>
          <div className="info">
            <p> posted {moment(post.date).fromNow()}</p>
          </div>

          <div className="edit">
            <Link to={`/update/${post._id}/${post.userId}`} state={post.userId}>
            <ion-icon name="create-outline"></ion-icon>
              {/* <img src={logo} alt="" /> */}
            </Link>
          </div>
          {/* {currentUser?.username === post.username && (
            )}  */}

          
         
          {currentUser && (
            <ion-icon
              style={{ color: "red" }}
              value={currentUser?.username}
              onClick={handleDelete}
              name="trash-outline"
            ></ion-icon>
          )}
        </div>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
