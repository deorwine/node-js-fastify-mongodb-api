const models = require("../database/models");
const helpers = require("../utils/helpers");
const { messages } = require("../config/messages");

/**
 * Get all webhooks
 * @param {Request} request
 * @param {Response} reply
 */
exports.getAllWebhooks = (request, reply) => {
  let searchCriteria = {};
  if (request.query.type) {
    searchCriteria.type = request.query.type;
  }
  if (request.query.source) {
    searchCriteria.source = request.query.source;
  }

  models.webhook
    .find(searchCriteria)
    .countDocuments()
    .then((count) => {
      let pagination = helpers.getPaginationFromRequest(request, count);

      models.webhook
        .find(searchCriteria)
        .sort({ createdAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .then((webhooks) => {
          return helpers.sendSuccessResponse(
            messages.common_reply_messages.success,
            helpers.getDataWithPaginationData(webhooks, pagination),
            reply
          );
        })
        .catch((error) => {
          return helpers.sendErrorResponse(
            error.message || messages.common_reply_messages.error_unknown,
            reply
          );
        });
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
      if (request.params.source == "admitad") {
        console.log("Text alert triggered.");
        helpers.sendTextMessage(
          "Verify your mobile number using OTP: AVASAR_ADMITAD_NEW_WEBHOOK. This OTP is valid for 5 minutes. - ReachLocal Ads (Expletus)"
        );
      }

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
