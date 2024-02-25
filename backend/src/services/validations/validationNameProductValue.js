const { nameSchema } = require('./schemas');

const validationNameProductValue = (nameProduct) => {
  const { error } = nameSchema.validate(nameProduct);
  if (error) {
    if (error.message.includes('required')) { 
      return { status: 'BAD_REQUEST', message: error.message }; 
    }
  
    if (error.message.includes('characters')) {
      return { status: 'INVALID_VALUE', message: error.message };
    }
  }
};

module.exports = validationNameProductValue;