var Sequelize = require('sequelize');
var sequelize = require('./database');

const Role = sequelize.define('Role', {
    roleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameRole: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
  
  
  module.exports = Role;