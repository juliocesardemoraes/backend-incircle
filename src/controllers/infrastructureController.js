var User = require("../model/User");
var Infrastructure = require("../model/Infrastructure");
var Role = require("../model/Role");
var UserRole = require("../model/UserRole");
var sequelize = require("../model/database");

const controller = {};

controller.create = async (req, res) => {
  // data
  const { capacity, productionType, productionArea } = req.body;
  // create
  const data = await Infrastructure.create({
    capacity: capacity,
    productionType: productionType,
    productionArea: productionArea,
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

module.exports = controller;
