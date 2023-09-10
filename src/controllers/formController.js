const Infrastructure = require("../model/Infrastructure");
const Role = require("../model/Role");
var User = require("../model/User");
var UserRole = require("../model/UserRole");
const { cryptoPassword } = require("../utils/passwordHash");

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

  try {
    const roleId = await Role.findAll({ where: { nameRole: role } });

    if (!roleId) {
      res.status(400).json({
        success: false,
        message: "Perfil não registado",
      });
      return;
    }

    const data = await User.create({
      name: name,
      email: email,
      password: await cryptoPassword(password),
      address: address,
      codigoPostal: codigoPostal,
      distrito: distrito,
      photo: photo,
    });

    const userRole = await UserRole.create({
      UserUserId: data.dataValues.userId,
      RoleRoleId: roleId[0].dataValues.roleId,
    });

    const infrastructure = await Infrastructure.create({
      capacity: capacity,
      productionType: productionType,
      productionArea: productionArea,
      UserUserId: data.dataValues.userId,
    });

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
