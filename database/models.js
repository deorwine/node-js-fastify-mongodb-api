const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const postSchema = new Schema(
  {
    description: String,
    avg_rating: Number,
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const postRatingSchema = new Schema(
  {
    post_id: Types.ObjectId,
    rating: Number,
    user_name: String,
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

//MODELS
exports.post = mongoose.model("posts", postSchema);
exports.postRating = mongoose.model("posts.ratings", postRatingSchema);
