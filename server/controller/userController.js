const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

// middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body; // selectedCity eklenen kısım

    //validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Name, email, password are required",
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already registered with this email!",
      });
    }

    // hashed password
    const hashedPassword = await hashPassword(password);

    // save user
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User registration succeeded.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred!",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password!",
      });
    }

    // find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Email not found!",
      });
    }

    // match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid password or email!",
      });
    }

    // token jwt
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Successfully Logged In.",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while logging in.",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // find user
    const user = await userModel.findOne({ email });

    //password valid.
    if (password && password.length < 6) {
      res.status(400).send({
        success: false,
        message: "Password required and should be 6 character long!",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    //update user
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { name: name || user.name, password: hashedPassword || user.password },
      { new: true }
    );
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Successfully Updated!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured!",
      error,
    });
  }
};
const updateSelectedCityController = async (req, res) => {
  try {
    const { selectedCity } = req.body;

    // find user
    const user = await userModel.findOne({ _id: req.auth._id });

    // update user's selected city
    user.selectedCity = selectedCity;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Selected city updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while updating selected city!",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
  updateSelectedCityController,
};
