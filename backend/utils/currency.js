const axios = require('axios');
const Company = require('../models/Company');

// Example: convert employee currency to company currency
exports.convertCurrency = async(amount, fromCurrency, company_id)=>{
  try{
    const company = await Company.findByPk(company_id);
    const toCurrency = company.default_currency;

    if(fromCurrency === toCurrency) return amount;

    // Fetch conversion rate from API or fixed dummy rate
    const response = await axios.get(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`);
    const rate = response.data.result || 1;
    return parseFloat(amount) * rate;
  }catch(err){
    console.error('Currency conversion failed', err);
    return amount;
  }
};