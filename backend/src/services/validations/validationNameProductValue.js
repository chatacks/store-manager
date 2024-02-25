const { nameSchema } = require('./schemas');

const validationNameProductValue = (nameProduct) => {
  const { error } = nameSchema.validate(nameProduct);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = validationNameProductValue;