const models = require("../database/models");
const helpers = require("../utils/helpers");
const { messages } = require("../config/messages");

/**
 * Get all webhooks
 * @param {Request} request
 * @param {Response} reply
 */
exports.getAllWebhooks = (request, reply) => {
  models.webhook
    .find()
    .select("-id -__v")
    .then((webhooks) => {
      return helpers.sendSuccessResponse(
        messages.common_reply_messages.success,
        webhooks,
        reply
      );
    })
    .catch((error) => {
      return helpers.sendErrorResponse(
        error.message || messages.common_reply_messages.error_unknown,
        reply
      );
    });
};

/**
 * Get a webhook by id
 * @param {Request} request
 * @param {Response} reply
 */
exports.getWebhookById = (request, reply) => {
  models.webhook
    .findById(request.params.id)
    .select("-id -__v")
    .then((webhook) => {
      return helpers.sendSuccessResponse(
        messages.common_reply_messages.success,
        webhook,
        reply
      );
    })
    .catch((error) => {
      return helpers.sendErrorResponse(
        error.message && error.message.includes("Cast to ObjectId failed")
          ? "Incorrect webhook id."
          : messages.common_reply_messages.error_unknown,
        reply,
        error.message && error.message.includes("Cast to ObjectId failed")
          ? 404
          : undefined
      );
    });
};

/**
 * Add a webhook
 * @param {Request} request
 * @param {Response} reply
 */
exports.addWebhook = (request, reply) => {
  let data = {
    source: request.params.source,
    type: request.params.type,
    values: request.body || {},
  };

  models.webhook
    .create(data)
    .then(() => {
      return helpers.sendSuccessResponse(
        messages.common_reply_messages.success_webhook_added,
        {},
        reply,
        1
      );
    })
    .catch((error) => {
      return helpers.sendErrorResponse(
        error.message || messages.common_reply_messages.error_unknown,
        reply
      );
    });
};


/**
 * Delete a webhook
 * @param {Request} request
 * @param {Response} reply
 */
exports.deleteWebhookById = (request, reply) => {
  models.webhook
    .deleteOne({ _id: request.params.id })
    .then((success) => {
      if (success.n) {
        return helpers.sendSuccessResponse(
          messages.common_reply_messages.success_webhook_deleted,
          {},
          reply
        );
      } else {
        return helpers.sendErrorResponse(
          messages.common_reply_messages.success_webhook_not_exist,
          reply
        );
      }
    })
    .catch((error) => {
      return helpers.sendErrorResponse(
        error.message || messages.common_reply_messages.error_unknown,
        reply
      );
    });
};