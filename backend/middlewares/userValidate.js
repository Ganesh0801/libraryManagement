const Joi = require("joi");


const romanNumeralRegex = /^(M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))$/i;

const borrowedBookValidation = Joi.object({
  bookId: Joi.string()
    .optional()
    .messages({ "string.base": "Book ID must be a string" }),
  title: Joi.string()
    .optional()
    .messages({ "string.base": "Book title must be a string" }),
  borrowedDate: Joi.date()
    .optional()
    .messages({ "date.base": "Borrowed date must be a valid date" }),
  dueDate: Joi.date()
    .optional()
    .messages({ "date.base": "Due date must be a valid date" }),
  isOverdue: Joi.boolean()
    .optional()
});



const userValidationSchema = Joi.object({
  registrationNumber: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "Registration number must be a string",
      "string.empty": "Registration number is required",
      "any.required": "Registration number is required",
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
  email: Joi.string()
    .email()
    .pattern(/@gmail\.com$/)
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.pattern.base": "Email must end with @gmail.com",
      "any.required": "Email is required",
    }),
  class: Joi.alternatives().try(
    Joi.number().integer().min(1).messages({
      "number.base": "Class must be a number",
      "number.integer": "Class must be an integer",
      "number.min": "Class must be at least 1",
    }),
    Joi.string().pattern(romanNumeralRegex).messages({
      "string.pattern.base": "Class must be a valid Roman numeral",
    })
  )
  .optional(),
  section: Joi.string()
    .trim()
    .optional()
    .messages({
      "string.base": "Section must be a string",
    }),
  gender: Joi.string()
    .valid("male", "female", "others")
    .required()
    .messages({
      "any.only": 'Gender must be one of "male", "female", or "others"',
      "any.required": "Gender is required",
    }),
  borrowedBooks: Joi.array()
    .items(borrowedBookValidation)
    .optional()
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
