var Sequelize = require('sequelize');
var sequelize = require('./database');
const User = require('./User');
const PaymentMethod = require('./PaymentMethod');

const Payment = sequelize.define('Payment', {
    paymentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cardNumber: Sequelize.INTEGER,
    cvv: Sequelize.INTEGER,
    expirationDate: Sequelize.INTEGER
  }, {
    timestamps: false
  }
  );
  Payment.belongsTo(User);
  User.hasMany(Payment);
  Payment.belongsTo(PaymentMethod);
  PaymentMethod.hasMany(Payment);
  
  module.exports = Payment;