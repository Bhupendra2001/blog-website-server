import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postId]);

  console.log(post.username);
  const handleDelete = async (props) => {
    try {
      if (props.username !== post.username)
        return alert("you only delete your  post", props.username);

      let res = await axios.delete(`/posts/${postId}`);
      alert(res);
      navigate("/");
    } catch (err) {
      alert("somthing is wrong");
    }
  };
  return (
    <div className="single">
      <div className="content">
        <img src={post.img} alt="" />
        <div className="user">
          <div className="info">
            <span>{post.username}</span>
            <p> posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser.username === post.username && (
            <div className="edit">
              <Link to="/write?edit=2">
                {" "}
                state={post.username}
                <img src={currentUser.img} alt="" />
              </Link>
            </div>
          )}

          {currentUser !== null && (
            <ion-icon
              value={currentUser.username}
              onClick={handleDelete}
              name="trash-outline"
            ></ion-icon>
          )}
          <ion-icon name="close-circle-outline"></ion-icon>
        </div>
        <h1> {post.title}</h1>
        {post.descp}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
