const Joi = require('joi');

const userValidationSchema = Joi.object({
  registrationNumber: Joi.string(),
  firstName: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'First name should be a string',
      'any.required': 'First name is required',
      'string.empty': 'First name cannot be empty'
    }),
  lastName: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Last name should be a string',
      'any.required': 'Last name is required',
      'string.empty': 'Last name cannot be empty'
    }),
  contactNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Contact number must be exactly 10 digits',
      'any.required': 'Contact number is required'
    }),
  email: Joi.string()
    .email()
    .pattern(/@gmail\.com$/)
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.pattern.base': 'Email must end with @gmail.com',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .max(10)
    .pattern(/[!@#$%^&*]/)
    .required()
    .messages({
      'string.min': 'Password should be at least 6 characters',
      'string.max': 'Password should be at most 10 characters',
      'string.pattern.base': 'Password must include at least one special character (!@#$%^&*)',
      'any.required': 'Password is required'
    }),
  username: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Username should be a string',
      'any.required': 'Username is required',
      'string.empty': 'Username cannot be empty'
    }),
  class: Joi.string().optional(),
  section: Joi.string().optional(),
  gender: Joi.string()
    .valid('male', 'female', 'others')
    .required()
    .messages({
      'any.only': 'Gender must be one of "male", "female", or "others"',
      'any.required': 'Gender is required'
    }),
  borrowedBooks: Joi.array().optional(),
  isAdmin: Joi.boolean().optional()
});

const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

module.exports = { userValidationSchema, validateUser };
