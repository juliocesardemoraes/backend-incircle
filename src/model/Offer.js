var Sequelize = require('sequelize');
var sequelize = require('./database');

const User = require('./User');

const Offer = sequelize.define(
  "Offer",
  {
    offerId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: Sequelize.INTEGER,
    priceEnergy: Sequelize.FLOAT,
    totalPrice: Sequelize.FLOAT,
    publishDate: Sequelize.DATE,
    updateDate: Sequelize.DATE,
  },
  {
    timestamps: false,
  }
);
  
  Offer.belongsTo(User);
  User.hasMany(Offer);
 

  module.exports = Offer;