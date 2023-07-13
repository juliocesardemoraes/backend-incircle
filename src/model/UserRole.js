var Sequelize = require("sequelize");
var sequelize = require("./database");
var User = require("./User");
var Role = require("./Role");

var UserRole = sequelize.define(
  "UserRole",
  {
    UserRoleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

UserRole.belongsTo(User);
User.hasMany(UserRole);
UserRole.belongsTo(Role);
Role.hasMany(UserRole);

module.exports = UserRole;
