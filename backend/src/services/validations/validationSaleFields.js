const { saleSchema } = require('./schemas');

const validationSaleFields = ([sale]) => {
  const { error } = saleSchema.validate(sale);
  if (error) {
    if (error.message.includes('required')) { 
      return { status: 'BAD_REQUEST', message: error.message }; 
    }
  
    if (error.message.includes('greater')) {
      return { status: 'INVALID_VALUE', message: error.message };
    }
  }
};

module.exports = validationSaleFields;