import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {
  const [post, setPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog-server-xq36.onrender.com/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`https://blog-server-xq36.onrender.com/api/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt="" />
        <div className='user'>
          
          <div className='info'>
            <span>{post.username}</span>
            <p> posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser.username === post.username && (
            <div className='edit'>
              <Link to='/write?edit=2'> state={post}
                <img alt="" />
              </Link>
              <ion-icon name="close-circle-outline"></ion-icon>
              <img onClick={handleDelete} alt="" />
            </div>
          )}

        </div>
        <h1> {post.title}</h1>
        {post.descp}
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single