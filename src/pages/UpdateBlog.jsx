import React, { useState , useContext} from "react";
import "./Update.css";
import Footer from "../components/Footer";
import axios from "axios";
import {useParams} from 'react-router-dom'
import { AuthContext } from "../context/authContext";


export const UpdateBlog = () => {

const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [img, setImg] = useState(null);
  const [date, setDate] = useState("");
  const [descp, setDescp] = useState("");

 const { blogId , userId} = useParams()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title" , title)
    formData.append("cat" , cat)
    formData.append("descp" , descp)
    formData.append("date" , date)
    formData.append("img" , img)
   console.log(formData)
   try{
    let res = await axios.patch(`https://blog-website-server-mongo.vercel.app/api/posts/${blogId}/${userId}` , formData , {
        headers: {
            "Content-Type": "multipart/form-data",
             "Authorization" : `Barear  ${currentUser?.token}`
          },
    })
  alert(res.data.message)
   }catch(err){
    alert(err.response.data.message)
   }
  };

  return (
    <div className="container">
      <h1>Update blog</h1>
      <from className="updateForm">
        <div className="inputContainer">
          <lable> Title :</lable>
          <input type="text" 
           placeholder="Title"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <lable> Description :</lable>
          <textarea 
           placeholder="Description"
           value={descp}
           onChange={(e) => setDescp(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <lable> Category :</lable>
          <select  onChange={(e) => setCat(e.target.value)} >
            <option value="art">Art</option>
            <option value="science">Science</option>
            <option value="cinema"> Cinema</option>
            <option value="design">Design</option>
            <option value="food">Food</option>
          </select>
        </div>

        <div className="inputContainer">
          <lable> Image :</lable>
          <input type="file"
           onChange={(e) => setImg(e.target.files[0])}
          />
        </div>

        <div className="inputContainer">
          <lable>Date :</lable>
          <input type="date"
           value={date}
          
           onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>Update</button>
      </from>
      <div>
        <Footer/>
      </div>
    </div>
  );
};
