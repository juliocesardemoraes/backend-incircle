var User = require("../model/User");
var Offer = require("../model/Offer");
var Payment = require("../model/Payment");
var PaymentMethod = require("../model/PaymentMethod");
var Infrastructure = require("../model/Infrastructure");
var Role = require("../model/Role");
var UserRole = require("../model/UserRole");
var Contract = require("../model/Contract");
var sequelize = require("../model/database");

const controller = {};
sequelize.sync();

controller.list = async (req, res) => {
  const data = await User.findAll({})
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
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
    password: password,
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
  res.status(200).json({
    success: true,
    message: "Registado",
    data: data,
  });
};

controller.delete = async (req, res) => {
  try {
    const deleteUser = await User.destroy({ where: { email: req.body.email } });
    if (deleteUser == 1) {
      res.status(200).json({
        success: true,
        message: "Utilizador deletado com sucesso!",
      });
    } else if (deleteUser == 0) {
      res.status(400).json({
        success: false,
        message: "Requisição má formulada. Utilizador pode não existir",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro no servidor",
    });
  }
};

module.exports = controller;
