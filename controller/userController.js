const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const TokenModel = require("../models/tokenModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
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
    subject: "verfication E-mail",
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

//Forgrt password

exports.forgetPassword = async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Email not registered." });
  }

  let tokenObj = await TokenModel.create({
    token: crypto.randomBytes(16).toString("hex"),
    user: user._id,
  });

  if (!tokenObj) {
    return res.status(400).json({ error: "Something went wrong." });
  }

  //send token to user in email
  const URL = `http://localhost:5000/resetpassword/${tokenObj.token}`;
  emailSender({
    from: "noreply@something.com",
    to: req.body.email,
    subject: "Password reset Email",
    text: `Click  on the following link to reset your password.`,
    html: `<a href='${URL}'><button>Reset Password</button></a>`,
  });
  res.send({ message: "Password reset link has been sent to your email." });
};

//reset password

exports.resetPassword = async (req, res) => {
  let tokenObj = await TokenModel.findOne({ token: req.params.token });
  if (!tokenObj) {
    return res.status(400).json({ error: "Tokeninvalid or may have expired." });
  }

  //find user
  let user = await UserModel.findById(tokenObj.user);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  let hased_password = await bcrypt.hash(req.body.password, 10);
  user.password = hased_password;
  user = await user.save();
  if (!user) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send({ message: "Password reset successful." });
};

exports.resendVerification = async (req, res) => {
  let user = await TokenModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  let tokenObj = await TokenModel.create({
    token: crypto.randomBytes(24).toString("hex"),
    user: user._id,
  });
  if (!tokenObj) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  const URL = `http://localhost/5000/verify/${tokenObj.token}`;
  emailSender({
    from: "noreply@something.com",
    to: req.email,
    subject: "verfication E-mail",
    text: `Click on the following link to activate your account.${URL}`,
    html: `<a href="${URL}"><button>verify now</button></a>`,
  });
  res.send({ message: "Verification link has been sent to your email." });
};
//login
exports.signup = async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Email is not registered." });
  }

  let passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ error: "Email and password doenot match." });
  }
  if (!user.isVerified) {
    return res.status(400).json({ error: "User not verified. Please verify." });
  }
};

//Signout
exports.signout = (req, res) => {
  res.clearCookie();
  res.send({ message: "Signed out successfully." });
};
