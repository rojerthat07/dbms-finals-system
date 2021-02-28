const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const studentSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  middle_name: Joi.string().required(),
  school_ID: Joi.number().required(),
  gender: Joi.string().required(),
  date_of_birth: Joi.string().required(),
  age: Joi.number().required(),
  year_level: Joi.string().required(),
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const adminAccountSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  middle_name: Joi.string().required(),
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  specialization: Joi.string().required(),
  department: Joi.string().required(),
});

module.exports = {
  loginSchema,
  studentSchema,
  adminAccountSchema,
};
