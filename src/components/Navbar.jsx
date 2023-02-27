import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import logo from './img/functionup.jpg'
import { AuthContext } from '../context/authContext'
export const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className='navbar'>
    <div className='container'>
      <div className='logo'>
        <Link to="/">
        <img src={logo} alt="" width={100} height={84}/>
        </Link>
      </div>
        <div className='links'>
          <Link className='link' to="/?cat=art"><h6>Art</h6></Link>
          <Link className='link' to="/?cat=cinema"><h6>Cinema</h6></Link>
          <Link className='link' to="/?cat=science"><h6>Science</h6></Link>
          <Link className='link' to="/?cat=design"><h6>Design</h6></Link>
          <Link className='link' to="/?cat=food"><h6>Food</h6></Link>
          <span>{currentUser?.username}</span>
         {currentUser ? <span onClick={logout}>Logout</span> : <Link className='link' to="/login"> Login </Link>} 
          <span className='write'>
            <Link id='li' className='link' to="/write">Write</Link>
            
          </span>
        </div>
    </div>
    </div>
  )
}
