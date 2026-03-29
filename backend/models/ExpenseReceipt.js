const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ExpenseReceipt = sequelize.define('ExpenseReceipt', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  expense_id: { type: DataTypes.INTEGER, allowNull: false },
  receipt_url: { type: DataTypes.TEXT },
  ocr_data: { type: DataTypes.JSONB }
}, { timestamps: true });

module.exports = ExpenseReceipt;