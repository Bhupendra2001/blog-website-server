import axios from "axios";
import React, { useState, useContext } from "react";
import "./Post.css";
import { AuthContext } from "../context/authContext";
import Footer from "../components/Footer";
function Post() {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [descp, setDescp] = useState("");
  const [cat, setCat] = useState("");
  const [img, setImg] = useState(null);
  const [date, setDate] = useState("");

  if (currentUser) console.log(title + " " + descp + " " + date + " " + cat);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("descp", descp);
    formData.append("img", img);
    formData.append("cat", cat);
    formData.append("uid", currentUser?.uid);
    formData.append("date", date);
    console.log(formData);
    try {
      let res = await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.data);
    } catch (err) {
      alert(err.response.data);
    }
  };
  return (
    <div className="cont">
      <h1>Create Post</h1>
      <form>
        <input
          className="input"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="lable">Description</label>
        <textarea
          className="input"
          placeholder="Description"
          value={descp}
          onChange={(e) => setDescp(e.target.value)}
        />

        <label className="lable"> categories </label>
        <select className="input" onChange={(e) => setCat(e.target.value)}>
          <option value="art">Art</option>
          <option value="science">Science</option>
          <option value="cinema"> Cinema</option>
          <option value="design">Design</option>
          <option value="food">Food</option>
        </select>

        <label className="lable">Blog Image</label>
        <input
          className="input"
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
        />

        <label className="lable">Blog Date</label>
        <input
          className="input"
          id="myDateInput"
          type={"date"}
          value={date}
          name="date"
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn" onClick={handleSubmit}>
          {" "}
          Create Blog
        </button>
      </form>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Post;
