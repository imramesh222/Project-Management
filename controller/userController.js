const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const TokenModel = require("../models/tokenModel");
const crypto = require("crypto");
const emailSender = require("../middleware/emailSender");

//register

exports.register = async (req, res) => {
  let { username, email, password } = req.body;

  //check if username is already registered or not
  let user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ error: "Username not available" });
  }
  user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email already taken" });
  }

  //encypt password
  let hased_password = await bcrypt.hash(password, 10);

  user = await UserModel.create({
    username,
    email,
    password,
  });
  if (!user) {
    return res.status(400).json({ error: "Something went wrong." });
  }

  let tokenObj = await TokenModel.create({
    token: crypto.randomBytes(24).toString("hex"),
    user: user._id,
  });
  if (!tokenObj) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  const URL = `http://localhost:5000/verify/${tokenObj.token}`;

  emailSender({
    from: "noreply@something.com",
    to: email,
    subject: "verfication E_mail",
    text: `Click on the following link to activate your account.${URL}`,
    html: `<a href="${URL}"><button>verify now</button></a>`,
  });
  res.send({ msg: "User registered successfully" });
};

exports.verifyUser = async (req, res) => {
  //check token if token is vaild or not
  let tokenObj = await TokenModel.findOne({ token: req.params.token });
  if (!tokenObj) {
    return res
      .status(400)
      .json({ error: "Invalid token or token may have expired" });
  }

  let user = await UserModel.findById(tokenObj.user);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  if (user.isVerified) {
    return res
      .status(400)
      .json({ error: "User already varified.Login to continue." });
  }

  user.isVerified = true;
  user = await user.save();

  if (!user) {
    return res.status(400).json({ error: "something went wrong" });
  }

  res.send({ message: "User verified" });
};
