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
      const userLocation = req.auth.location;
      filter = {
        "location.coordinates": {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [userLocation.longitude, userLocation.latitude],
            },
            $maxDistance: 100000, // Adjust the distance as needed (meters)
          },
        },
      };
    }

    // Add category filter if available
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const posts = await postModel
      .find(filter)
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });

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


const getUserPostsController = async (req, res) => {
  try {
    // İstekten gelen kullanıcı kimliğini al
    const userId = req.params.userId
    // Kullanıcının postlarını getir
    const posts = await postModel
      .find({ postedBy: userId })
      .populate("postedBy", "_id") // İlgili alanları belirtin
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All Posts",
      posts,
    });

  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user's posts",
      error,
    });
  }
};



const deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId; // Kullanıcının kimliğini al

    // Silinecek gönderiyi bul
    const post = await postModel.findById(postId);

    // Gönderi bulunamazsa hata döndür
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // // Gönderinin sahibiyle, isteği gönderen kullanıcının kimliğini karşılaştır
    // if (post.postedBy.toString() !== userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Unauthorized: You are not allowed to delete this post",
    //   });
    // }

    // Gönderiyi sil
    const deletedPost = await postModel.findByIdAndDelete(postId);

    // Başarılı bir yanıt döndür
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the post",
      error,
    });
  }
};



module.exports = { createPostController, getAllPostsController, deletePostController, getUserPostsController };
