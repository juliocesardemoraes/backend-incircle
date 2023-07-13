const Role = require("../model/Role");
var User = require("../model/User");
var sequelize = require("../model/database");

const controller = {};

controller.create = async (req, res) => {
  const { nameRole } = req.body;
  console.log("AQUII", nameRole);
  try {
    const data = await Role.create({
      nameRole: nameRole,
    });
    console.log("DATA", data);
    res.status(200).json({
      name: nameRole,
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
