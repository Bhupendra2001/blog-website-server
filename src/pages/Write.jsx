import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.descp || "");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(state?.title || "");
  const [cat, setCat] = useState(state?.cat || "");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            descp: value,
            cat,
            img: file ? file : "",
          })
        : await axios.post(`/posts/`, {
            title,
            descp: value,
            cat,
            img: file ? file : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
    } catch (err) {
      alert("some" + err.message);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          style={{ width: 410, margin: 10 }}
          className="input"
          type="text"
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="abc">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>publish</h1>
          <span>
            <b>Status : </b> draft
          </span>
          <span>
            <b>Visibility : </b> public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="degine">Degine</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="foods">Foods</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
