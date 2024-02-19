require("dotenv").config();
require("../config/global");
require("../database");

const fastify = require("fastify")({ logger: true, ignoreTrailingSlash: true });

const corsOptions = {
  origin: "*",
  methods: ["PUT", "POST", "DELETE", "GET"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "authorization",
    "Accept-Encoding",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

fastify.register(require("fastify-cors"), {
  corsOptions,
});

fastify.register(require("fastify-helmet"), {
  hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "same-origin" },
});

fastify.register(require("fastify-formbody"));

// Declare routes
const routes = require("../routes");
routes.forEach((route) => {
  const base_path = "/api/";
  route.url = base_path + route.url;
  fastify.route(route);
});

fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
});

export default async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
