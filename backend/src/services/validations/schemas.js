const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().min(3),
});

module.exports = {
  nameSchema,
};