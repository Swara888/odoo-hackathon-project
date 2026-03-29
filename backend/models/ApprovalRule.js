const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ApprovalRule = sequelize.define('ApprovalRule', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  company_id: { type: DataTypes.INTEGER, allowNull: false },
  rule_type: { type: DataTypes.ENUM('Percentage','Specific','Hybrid'), allowNull: false },
  threshold: { type: DataTypes.DECIMAL(5,2) },
  approver_id: { type: DataTypes.INTEGER }
}, { timestamps: true });

module.exports = ApprovalRule;