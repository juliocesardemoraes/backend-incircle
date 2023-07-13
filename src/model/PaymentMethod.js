var Sequelize = require('sequelize');
var sequelize = require('./database');

const PaymentMethod = sequelize.define('PaymentMethod', {
  paymentMethodId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameMethod: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: false
});


module.exports = PaymentMethod;