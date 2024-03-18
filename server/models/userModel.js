const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lütfen adınızı girin"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Lütfen e-posta adresinizi girin"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Lütfen şifrenizi girin"],
      min: 6,
      max: 64,
    },
    role: {
      type: String,
      default: "user",
    },
    profileImage: {
      data: Buffer,
      contentType: String
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: false
      },
      coordinates: {
        type: [Number],
        required: false
      }
    }
  },
  { timestamps: true }
);

// Index for geospatial queries
userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
