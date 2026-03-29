// backend/test.js
const { User, Company, Expense } = require('./models');

console.log('User model loaded:', !!User);
console.log('Company model loaded:', !!Company);
console.log('Expense model loaded:', !!Expense);