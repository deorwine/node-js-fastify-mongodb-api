const models = require("../database/models");

/**
 * Update average rating of a post whenever rating submitted for any bid
 * so that we do not have to recalculate average rating on every request
 * @param {String} post_id
 */
exports.updatePostAverageRatingByPostId = (post_id) => {
  models.postRating
    .find({ post_id })
    .select("-user_name")
    .then(async (posts) => {
      let count = 0;
      let rating_total = 0;
      for (const post of posts) {
        count++;
        rating_total += post.rating;
      }
      let avg_rating = rating_total / count;
      if (avg_rating) {
        await models.post.updateOne({ _id: post_id }, { avg_rating });
      }
    })
    .catch((error) => {
      console.log("===>> Error in updatePostAverageRatingByPostId", error);
    });
};
