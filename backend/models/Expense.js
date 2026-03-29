const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Expense = sequelize.define('Expense', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  currency: { type: DataTypes.STRING(3), allowNull: false },
  amount_in_company_currency: { type: DataTypes.DECIMAL(12,2) },
  category: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('Pending','Approved','Rejected'), defaultValue: 'Pending' }
}, { timestamps: true });

module.exports = Expense;