const Role = require("../model/Role");
const User = require("../model/User");
const UserRole = require("../model/UserRole");
const sequelize = require("../model/database");
const { cryptoPassword, comparePassword } = require("../utils/passwordHash");

const controller = {};
sequelize.sync().then(() => {
  Role.create({
    nameRole: "vendedor",
  });
  Role.create({
    nameRole: "comprador",
  });
});

controller.list = async (req, res) => {
  const data = await User.findAll({})
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  return res.json({ success: true, data: data });
};

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
  // create
  const data = await User.create({
    name: name,
    email: email,
    password: await cryptoPassword(password),
    address: address,
    codigoPostal: codigoPostal,
    distrito: distrito,
    photo: photo,
    roleId: role,
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  // return res
  return res.status(200).json({
    success: true,
    message: "Registado",
    data: data,
  });
};

controller.delete = async (req, res) => {
  try {
    const deleteUser = await User.destroy({ where: { email: req.body.email } });
    if (deleteUser == 1) {
      return res.status(200).json({
        success: true,
        message: "Utilizador deletado com sucesso!",
      });
    } else if (deleteUser == 0) {
      return res.status(400).json({
        success: false,
        message: "Requisição má formulada. Utilizador pode não existir",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro no servidor",
    });
  }
};

controller.auth = async (req, res) => {
  if (!req.query.email || !req.query.password) {
    return res.status(400).json({
      success: false,
      message: "Usuário ou senha faltantes",
    });
  }

  const user = await User.findOne({ where: { email: req.query.email } });
  const userRole = await UserRole.findOne({
    where: { UserUserId: user.dataValues.userId },
  });

  if (!userRole?.dataValues?.RoleRoleId) {
    return res.status(500).json({
      success: false,
      message: "Usuário inválido, não possue role",
    });
  }

  const role = await Role.findOne({
    where: { roleId: userRole.dataValues.RoleRoleId },
  });

  if (!user) {
    return res.status(403).json({
      success: false,
      message: "Usuário ou senha Inválidos",
    });
  }
  const isEqual = await comparePassword(req.query.password, user.password);

  if (isEqual) {
    return res.status(200).json({
      success: true,
      message: "Acesso permitido!",
      role: role.dataValues.nameRole,
      userId: user.userId,
    });
  } else {
    return res.status(403).json({
      success: false,
      message: "Acesso Inválido",
    });
  }
};

module.exports = controller;
