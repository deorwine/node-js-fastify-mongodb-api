const WebhookController = require("../controllers/webhook.controller");

module.exports = [
  {
    method: "GET",
    url: "webhooks",
    handler: WebhookController.getAllWebhooks,
  },
  {
    method: "GET",
    url: "webhooks/:id",
    handler: WebhookController.getWebhookById,
  },
  {
    method: "DELETE",
    url: "webhooks/:id",
    handler: WebhookController.deleteWebhookById,
  },
  {
    method: "POST",
    /**
     * webhooks/admitad/actions
     * webhooks/admitad/programs
     */
    url: "webhooks/:source/:type",
    handler: WebhookController.addWebhook,
  },
];
