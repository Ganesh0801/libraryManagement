const Joi = require("joi");

const bookValidationSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Title is required",
      "string.empty": "Title cannot be empty",
    }),
  language: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Language is required",
      "string.empty": "Language cannot be empty",
    }),
  category: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Category is required",
      "string.empty": "Category cannot be empty",
    }),
  edition: Joi.string()
    .trim()
    .optional(),
  author: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Author is required",
      "string.empty": "Author cannot be empty",
    }),
  publisherName: Joi.string()
    .trim()
    .optional(),
  availableCopies: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "any.required": "Available copies is required",
      "number.base": "Available copies must be a number",
      "number.integer": "Available copies must be an integer",
      "number.min": "Available copies cannot be negative",
    }),
});


const validateBook = (req, res, next) => {
  const { error } = bookValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

module.exports = { bookValidationSchema ,validateBook};
