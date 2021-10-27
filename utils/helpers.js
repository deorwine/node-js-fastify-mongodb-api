const { messages } = require("../config/messages");
const _ = require("lodash");

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
