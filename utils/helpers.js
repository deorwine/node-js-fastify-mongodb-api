const { messages } = require("../config/messages");
const _ = require("lodash");
const axios = require("axios").default;

/**
 * Send success response with custom message and status code
 * @param {String} message
 * @param {Object} data
 * @param {Response} reply
 */
exports.sendSuccessResponse = (message, data, reply) => {
  var response = {
    status: true,
    message: message,
  };
  if (_.size(data)) {
    response.result = data;
  }
  reply.status(messages.status_code.success).send(response);
};

/**
 * Validate inputs of request
 * @param {Object} schema
 * @param {Object} inputs
 * @param {Response} reply
 * @returns Object
 */
exports.validateInputs = (schema, inputs, reply) => {
  const { error, value } = schema.validate(inputs, { abortEarly: false });
  if (_.size(error)) {
    this.sendValidationsErrorResponse(error.details, reply);
  } else {
    return value;
  }
};

/**
 * Send input validations error response
 * @param {Object} errors
 * @param {Response} reply
 */
exports.sendValidationsErrorResponse = (errors, reply) => {
  var data = {};
  errors.map((error) => {
    data[error.context.label || error.context.key] = error.message;
  });

  const response = {
    status: false,
    message: "Validation Errors",
    errors: data,
  };
  return reply.status(400).send(response);
};

/**
 * Send error response
 * @param {String} message
 * @param {Response} reply
 * @param {Number} statusCode
 */
exports.sendErrorResponse = (msg, reply, statusCode = undefined) => {
  var err = {
    status: false,
    message: msg,
  };

  reply.status(statusCode ? statusCode : 400).send(err);
};

/**
 * Get pagination from request
 * @param {Request} request
 * @returns Object {pageNo, skip, limit}
 */
exports.getPaginationFromRequest = (request, count) => {
  let pageNo = Number(request.query.pageNo) || 1;
  let limit = Number(request.query.pageSize) || 10;
  let skip = (pageNo - 1) * limit; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  let totalPages = Math.ceil(count / limit);
  return {
    limit,
    skip,
    pageNo: pageNo,
    totalPages,
    totalLength: count,
  };
};

/**
 * Get data with pagination data
 * @param {Object} data
 * @param {Object} pagination
 * @returns Object {data, meta_data}
 */
exports.getDataWithPaginationData = (data, pagination) => {
  return {
    data,
    meta_data: {
      pageNo: pagination.pageNo,
      limit: pagination.limit,
      count: _.size(data),
      totalPages: pagination.totalPages,
      totalLength: pagination.totalLength,
    },
  };
};

exports.sendTextMessage = (template = "") => {
  console.log("A");
  let configData = {
    key: global.TEXT_KEY,
    to: "7976609630",
    from: "EXPLTS",
    body: template,
    entityid: `${global.TEXT_ENTITY_ID}`,
    templateid: `${global.TEXT_TEMPLATE_ID}`,
  };
  return axios
    .post("https://api.grow-infinity.io/api/jsms", configData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("response", response.data || response);
      console.log("configData", configData);
    })
    .catch((error) => {
      console.log(error);
    });
};
