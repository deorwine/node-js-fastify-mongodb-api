const PostController = require("../controllers/post.controller");
const PostInputSchema = require("./requestInputSchemas/post.input.schema");
const helpers = require("../utils/helpers");

module.exports = [
  {
    method: "GET",
    url: "posts",
    handler: PostController.getAllPosts,
  },
  {
    method: "GET",
    url: "posts/:post_id",
    handler: PostController.getPostById,
  },
  {
    method: "POST",
    url: "posts",
    preHandler: [
      (request, reply, next) => {
        request.query = helpers.validateInputs(
          PostInputSchema.addPost,
          request.body,
          reply
        );
        next();
      },
    ],
    handler: PostController.addPost,
  },
  {
    method: "PUT",
    url: "posts/:post_id",
    preHandler: [
      (request, reply, next) => {
        request.query = helpers.validateInputs(
          PostInputSchema.addPost,
          request.body,
          reply
        );
        next();
      },
    ],
    handler: PostController.editPostById,
  },
  {
    method: "DELETE",
    url: "posts/:post_id",
    handler: PostController.deletePostById,
  },
  {
    method: "POST",
    url: "posts/:post_id/rating",
    preHandler: [
      (request, reply, next) => {
        request.query = helpers.validateInputs(
          PostInputSchema.ratePost,
          request.body,
          reply
        );
        next();
      },
    ],
    handler: PostController.ratePostById,
  },
];
