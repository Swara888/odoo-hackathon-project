const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ExpenseApproval = sequelize.define('ExpenseApproval', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  expense_id: { type: DataTypes.INTEGER, allowNull: false },
  approver_id: { type: DataTypes.INTEGER, allowNull: false },
  sequence_number: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('Pending','Approved','Rejected'), defaultValue: 'Pending' },
  comments: { type: DataTypes.TEXT }
}, { timestamps: true });

module.exports = ExpenseApproval;