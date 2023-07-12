var Sequelize = require('sequelize');
var sequelize = require('./database');
const User = require('./User');

const Infrastructure = sequelize.define('Infrastructure', {
    infrastructureId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    capacity: Sequelize.FLOAT,
    productionType: Sequelize.STRING,
    ProductionArea: Sequelize.STRING,
    
  }, {
    timestamps: false
  }
  );

  Infrastructure.belongsTo(User);
  User.hasOne(Infrastructure);

  module.exports = Infrastructure;