const postModel = require("../models/postModel");
const { uploadFile } = require("../aws");

const { isValidObjectId } = require("mongoose");
const CreatePost = async (req, res) => {
  try {
    const userid = req.params.userId;
    if (!userid)
      return res
        .status(400)
        .send({ status: false, message: "userId not present in params" });
    if (!isValidObjectId(userid))
      return res.status(401).send({ status: false, message: "invalid userId" });

    let data = req.body;

    let { title, descp, cat, date } = data;

    if (!title) return res.status(400).send("please given the title");
    if (!descp) return res.status(400).send("please given the descp");
    if (!cat) return res.status(400).send("please given the cat");
    if (!date) return res.status(400).send("please given the date");
 
    data['date'] =  new Date()
    data["userId"] = userid;
    let image = req.files;

    if (!image[0]) return res.status(400).send("please give me image");
    data["img"] = await uploadFile(image[0]);

    const savedData = await postModel.create(data);
    return res
      .status(200)
      .send({
        status: true,
        data: savedData,
        message: "Data successfully created data",
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const category = req.query.cat;

    const Data = category
      ? await postModel.find({ cat: category })
      : await postModel.find();

    return res.status(200).send({ status: true, data: Data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const blogid = req.params.blogId;
    if (!blogid)
      return res
        .status(400)
        .send({ status: false, message: "blogid not present in params" });
    if (!isValidObjectId(blogid))
      return res.status(401).send({ status: false, message: "invalid blogid" });

    const post = await postModel.findById(blogid);

    return res.status(200).send({ status: true, data: post });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const updatePost = async (req, res) => {
  const blogid = req.params.blogId;
  if (!blogid)
    return res
      .status(400)
      .send({ status: false, message: "blogid not present in params" });
  if (!isValidObjectId(blogid))
    return res.status(401).send({ status: false, message: "invalid blogid" });

  try {

    let image = req.files
    let data = req.body;
    let { title, descp, cat } = data;

    if(image[0]){
    
      data["img"] = await uploadFile(image[0]);
  
    }
    if (title) {
      if (title.trim().length == 0)
        return res
          .status(400)
          .send({
            status: false,
            message: "Title should not be empty & blanck space",
          });
    }
    if (descp) {
      if (descp.trim().length == 0)
        return res
          .status(400)
          .send({
            status: false,
            message: " description should not be empty & blanck space",
          });
    }
    if (cat) {
      if (!["art", "cinema", "science", "design", "food"].includes(cat)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter valid cat" });
      }
    }


    const updateData = await postModel.findByIdAndUpdate(blogid, data, {
      new: true,
    });

    return res
      .status(200)
      .send({ status: true, data: updateData, message: "update successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deletePost = async (req, res) => {
  const blogid = req.params.blogId;
  if (!blogid)
    return res
      .status(400)
      .send({ status: false, message: "blogid not present in params" });
  if (!isValidObjectId(blogid))
    return res.status(401).send({ status: false, message: "invalid blogid" });

  try {
    await postModel.findByIdAndDelete(blogid);
    return res
      .status(200)
      .send({ status: true, message: "Blog Deleted successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


module.exports = { CreatePost, getPosts, getPost, updatePost, deletePost };
