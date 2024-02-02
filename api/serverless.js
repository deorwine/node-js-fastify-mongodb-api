// import { onRequestHandler, onResponseHandler } from "../utils/helpers";

// const fastify = require("fastify")({
//   logger: true,
//   trustProxy: true,
// });
// const path = require("path");

// require("module-alias/register");
// require("dotenv").config();
// require("../configs/global");
// require("../configs/cron");
// require("../database/index");
// require("../configs/errorLogger");

// const corsOptions = {
//   origin: "*",
//   methods: ["OPTIONS", "GET", "DELETE", "POST", "PUT", "PATCH"],
//   allowedHeaders: [
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "authorization",
//     "Accept-Encoding",
//   ],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   exposedHeaders: "Content-Disposition",
// };

// fastify.register(require("@fastify/cors"), corsOptions);

// fastify.register(require("@fastify/multipart"), {
//   addToBody: true,
//   sharedSchemaId: "#mySharedSchema",
//   limits: {
//     fileSize: global.UPLOAD_FILE_MAX_SIZE * 1024 * 1024, //the max file size in bytes
//   },
// });

// fastify.register(require("@fastify/static"), {
//   root: path.join(__dirname, "public"),
//   prefix: "/public/",
// });

// fastify.register(require("@fastify/formbody"));

// //routes
// require("../routes/v1").forEach((route) => {
//   fastify.route(route);
// });

// fastify.addHook("onRequest", onRequestHandler);
// fastify.addHook("onResponse", onResponseHandler);

// fastify.get("/", (req, reply) => {
//   reply.send({ hello: "world 1.0" });
// });

// // fastify.listen({ host: global.HOST, port: global.PORT }, (err) => {
// //   if (err) {
// //     fastify.log.error(err);
// //     process.exit(1);
// //   }
// //   fastify.log.info(`server listening on ${fastify.server.address().port}`);
// // });

// export default async (req, res) => {
//   await fastify.ready();
//   fastify.server.emit("request", req, res);
// };

require("dotenv").config();
require("../config/global");
require("../database");

const fastify = require("fastify")({ logger: true });

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
