const postModel = require("../models/postModel");
const axios = require("axios");
const userModel = require("../models/userModel");

const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    const { address } = response.data;
    return {
      city: address.city,
      country: address.country,
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return {};
  }
};

const createPostController = async (req, res) => {
  try {
    const { title, description, location, category } = req.body;

    // Validate
    if (
      !title ||
      !description ||
      !location ||
      !location.latitude ||
      !location.longitude ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, and valid location data.",
      });
    }

    // Reverse geocode to get city and country information
    const { city, country } = await reverseGeocode(
      location.latitude,
      location.longitude
    );

    // Create a new post
    const post = new postModel({
      title,
      description,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude], // MongoDB uses [longitude, latitude] order
        address: `${city}, ${country}`, // or use any other relevant address data
      },
      category,
      postedBy: req.auth._id,
    });

    // Save the post to the database
    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred in the Post API",
      error,
    });
  }
};

const getAllPostsController = async (req, res) => {
  try {
    let filter = {};

    // Eğer kullanıcının konumu varsa, onun şehrine göre filtrele
    if (req.auth && req.auth.location) {
      const { latitude, longitude } = req.auth.location;
      const { city } = await reverseGeocode(latitude, longitude);

      console.log("User Location:", req.auth.location);
      console.log("User City:", city);

      filter = {
        "location.address": new RegExp(city, "i"), // Büyük-küçük harf duyarlı olmayan şehir ismi filtresi
      };
    }

    // Add category filter if available
    if (req.query.category) {
      filter.category = req.query.category;
      console.log("Category Filter:", filter.category); // Log the category filter
    }

    const posts = await postModel
      .find(filter)
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });

    console.log("Filtered Posts Count:", posts.length);

    res.status(200).send({
      success: true,
      message: "All Posts",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An Error Occurred!",
      error,
    });
  }
};




module.exports = { createPostController, getAllPostsController };
