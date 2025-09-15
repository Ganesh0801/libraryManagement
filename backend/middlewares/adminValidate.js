const Joi = require("joi");

const adminValidationSchema = Joi.object({
  username: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "Username must be a string",
      "any.required": "Username is required",
      "string.empty": "Username cannot be empty",
    }),
  email: Joi.string()
    .email()
    .pattern(/@gmail\.com$/)
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.pattern.base": "Email must end with @gmail.com",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(6)
    .max(10)
    .pattern(/[!@#$%^&*]/)
    .required()
    .messages({
      "string.min": "Password should be at least 6 characters",
      "string.max": "Password should be at most 10 characters",
      "string.pattern.base": "Password must include at least one special character (!@#$%^&*)",
      "any.required": "Password is required",
    }),
  firstName: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
    }),
  lastName: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Last name is required",
      "string.empty": "Last name cannot be empty",
    }),
  contactNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Contact number must be exactly 10 digits",
      "any.required": "Contact number is required",
    }),
});

const validateAdmin = (req, res, next) => {
  const { error } = adminValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

module.exports = { adminValidationSchema, validateAdmin };
