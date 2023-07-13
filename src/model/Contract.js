var Sequelize = require('sequelize');
var sequelize = require('./database');

const User = require('./User');
const Offer = require('./Offer');

const Contract = sequelize.define('contract', {
  contractID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contractDate: Sequelize.DATE,
  contractDetails: Sequelize.STRING,
  status: Sequelize.STRING

}, {
  timestamps: false
});

Contract.belongsTo(Offer);
Offer.hasMany(Contract);
Contract.belongsTo(User, {foreignKey: {name:'sellerId'}});
User.hasMany(Contract, {foreignKey: {name:'sellerId'}});
Contract.belongsTo(User, {foreignKey: {name:'buyerId'}});
User.hasMany(Contract, {foreignKey: {name:'buyerId'}});



module.exports = Contract;