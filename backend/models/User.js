const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Company = require('./Company');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('Admin','Manager','Employee'), allowNull: false },
  manager_id: { type: DataTypes.INTEGER, allowNull: true }
}, { timestamps: true });

User.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = User;