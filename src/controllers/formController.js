const Infrastructure = require("../model/Infrastructure");
const Role = require("../model/Role");
var User = require("../model/User");
var UserRole = require("../model/UserRole");
var sequelize = require("../model/database");

const controller = {};

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
    capacity,
    productionType,
    productionArea,
  } = req.body;
  console.log("REQ", req.body);

  try {
    const roleId = await Role.findAll({ where: { nameRole: role } });

    if (!roleId) {
      res.status(400).json({
        success: false,
        message: "Perfil não cadastrado",
      });
      return;
    }

    const data = await User.create({
      name: name,
      email: email,
      password: password,
      address: address,
      codigoPostal: codigoPostal,
      distrito: distrito,
      photo: photo,
    });
    console.log("USER", data);

    const userRole = await UserRole.create({
      UserUserId: data.dataValues.userId,
      RoleRoleId: roleId[0].dataValues.roleId,
    });
    console.log("USERROLE", data);

    const infrastructure = await Infrastructure.create({
      capacity: capacity,
      productionType: productionType,
      productionArea: productionArea,
      UserUserId: data.dataValues.userId,
    });
    console.log("USERROLE", infrastructure);

    res.status(200).json({
      success: true,
      message: "Usuário cadastrado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro na criação: " + error,
    });
  }
};

module.exports = controller;
