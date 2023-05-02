const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookies = process.env.cookee;
const key = process.env.Secret;

const { emailValidation } = require("../validation");

const register = async (req, res) => {
  try {
    let data = req.body;
    let { username, email, password } = data;
    if (!username) return res.status(400).send("please enter username");
    if (!email) return res.status(400).send("please enter email");
    if (!password) return res.status(400).send("please enter password");
    if (!emailValidation(email))
      return res.status(400).send("please enter valid email");

    let check = await userModel.findOne({ email });
    if (check) return res.status(400).send("user already exits ?");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    data["password"] = hash;
    const userData = await userModel.create(data);

    return res
      .status(201)
      .send({ message: "successfully register", data: userData });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    let email = req.body.email;

    if (!email) return res.status(400).send("please enter the email");
    if (!req.body.password)
      return res.status(400).send("please enter the password");

    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).send("user not found ?");

    // check password
    const CheckPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!CheckPassword) return res.status(400).send("Wrong email or password");

    const token = jwt.sign({ userId: user._id }, key);
    const { password, ...other } = user;

    return res
      .cookie(cookies, token, { httpOnly: true })
      .status(200)
      .send(Result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const logout = (req, res) => {
    res
      .clearCookie(cookies, {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out");
  };
module.exports = { register, login , logout};
