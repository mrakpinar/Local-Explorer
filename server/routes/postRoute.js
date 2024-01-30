const express = require("express");
const {
  requireSignIn,
  updateSelectedCityController,
} = require("../controller/userController");
const {
  createPostController,
  getAllPostsController,
} = require("../controller/postController");

// router object
const router = express.Router();

// create post
router.post("/create-post", requireSignIn, createPostController);

//get all post
router.get("/get-all-post", getAllPostsController);

//update selected city
router.post(
  "/update-selected-city",
  requireSignIn,
  updateSelectedCityController
);
module.exports = router;
