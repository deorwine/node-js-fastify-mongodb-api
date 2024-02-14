const postRoutes = require("./post.route");
const webhookRoutes = require("./webhook.route");

//all routes
module.exports = [...postRoutes, ...webhookRoutes];
