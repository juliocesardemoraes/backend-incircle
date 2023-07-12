const Role = require("../model/Role");
var User = require("../model/User");
var UserRole = require("../model/UserRole");
var sequelize = require("../model/database");

const controller = {};
sequelize.sync();

controller.create = async (req, res) => {
  // data
  const {
    name,
    email,
    password,
    address,
    codigoPostal,
    distrito,
    photo,
    role,
  } = req.body;
  try {
    const data = await User.create({
      name: name,
      email: email,
      password: password,
      address: address,
      codigoPostal: codigoPostal,
      distrito: distrito,
      photo: photo,
    });
    const roleId = await Role.findAll({ where: { nameRole: role } });

    const userRole = await UserRole.create({
      UserUserId: data.dataValues.userId,
      RoleRoleId: roleId[0].dataValues.roleId,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro na criação",
    });
  }
};

module.exports = controller;
