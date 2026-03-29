const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Company = sequelize.define('Company', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  default_currency: { type: DataTypes.STRING(3), allowNull: false }
}, { timestamps: true });

module.exports = Company;