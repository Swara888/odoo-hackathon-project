const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RuleApprover = sequelize.define('RuleApprover', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rule_id: { type: DataTypes.INTEGER, allowNull: false },
  approver_id: { type: DataTypes.INTEGER, allowNull: false },
  sequence: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

RuleApprover.associate = (models) => {
  RuleApprover.belongsTo(models.ApprovalRule, { foreignKey: 'rule_id' });
  RuleApprover.belongsTo(models.User, { foreignKey: 'approver_id' });
};

module.exports = RuleApprover;