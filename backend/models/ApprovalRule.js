const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ApprovalRule = sequelize.define('ApprovalRule', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  company_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false }, // new field
  rule_type: { type: DataTypes.ENUM('Percentage','Specific','Hybrid'), allowNull: false },
  percentage: { type: DataTypes.DECIMAL(5,2) },      // renamed from threshold
  min_amount: { type: DataTypes.DECIMAL(12,2) },    // new field
  max_amount: { type: DataTypes.DECIMAL(12,2) },    // new field
  specific_approver_id: { type: DataTypes.INTEGER }  // renamed from approver_id
}, { timestamps: true });

module.exports = ApprovalRule;