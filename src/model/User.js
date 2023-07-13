var Sequelize = require('sequelize');
var sequelize = require('./database');

const User = sequelize.define('User', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  codigoPostal: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  distrito: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photo: Sequelize.STRING

}, {
  timestamps: false
});



module.exports = User;