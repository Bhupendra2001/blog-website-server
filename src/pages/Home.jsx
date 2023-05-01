import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import moment from "moment";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            {currentUser && (
              <div className="content">
                <h2 style={{color : "gray"}}>{post.title}</h2>
                <p style={{color : "brown"}}>{post.descp}</p>
                <span>posted {moment(post.date).fromNow()}</span>
                <p>{post.cat}</p>
                {currentUser._doc._id === post.userId && (
                  <Link className="link" to={`/post/${post._id}`}>
                    <button> Read More</button>
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
