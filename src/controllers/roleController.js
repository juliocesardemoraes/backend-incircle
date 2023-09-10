const Role = require("../model/Role");

const controller = {};

controller.list = async (req, res) => {
  try {
    const data = await Role.findAll({});
    res.status(200).json({
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao tentar achar roles",
    });
  }
};

controller.create = async (req, res) => {
  const { nameRole } = req.body;
  try {
    const data = await Role.create({
      nameRole: nameRole,
    });
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
