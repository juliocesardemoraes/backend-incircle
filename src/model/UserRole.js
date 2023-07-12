var Sequelize = require('sequelize');
var sequelize = require('./database');
var User = require('./User');
var Role = require('./Role');


var UserRole= sequelize.define(UserRole, {

}, {
    timestamps: false
  })


UserRole.belongsTo(User);
User.hasMany(UserRole);
UserRole.belongsTo(Role);
Role.hasMany(UserRole);
