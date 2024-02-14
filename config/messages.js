exports.messages = {
  status_code: {
    success: 200,
    error_400: 400,
  },
  common_reply_messages: {
    success: "success",
    success_post_rating_added: "Post rated successfully.",
    success_post_added: "Post added successfully.",
    success_post_deleted: "Post deleted successfully.",
    success_post_not_exist: "Post does not exist.",
    success_post_updated: "Post updated successfully.",
    success_webhook_added: "Webhook data logged successfully.",
    success_webhook_deleted: "Webhook logged data deleted successfully.",
    success_webhook_not_exist: "Webhook data does not exist.",
    error_unknown:
      "Something went wrong. We cannot fulfill your request at the moment.",
  },
  validation_errors: {
    body: "Request body data is required",
    field_empty: "cannot be an empty field",
    string_base: "should be a type of string",
    string_email: "must be a valid email",
    string_min: "should have a minimum length of",
    string_max: "length must be less than or equal to",
    number_base: "should be a type of number",
    number_min: "must be greater than or equal to",
    number_max: "must be less than or equal to",
    field_required: "is a required field",
  },
};
