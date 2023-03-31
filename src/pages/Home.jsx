import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            {currentUser !== null && (
              <div className="content">
                {currentUser.id !== post.uid && (
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                )}
                <p>{getText(post.descp)}</p>

                <button> Read More</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
