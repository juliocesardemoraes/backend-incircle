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
//sequelize.sync()

controller.list = async (req, res) => {
  const data = await Offer.findAll({
    include: [User],
  })
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
  const { quantity, priceEnergy, totalPrice, UserUserId } = req.body;
  const publishDate = new Date();
  const updateDate = new Date();
  // User.findAll
  // create
  const data = await Offer.create({
    quantity: quantity,
    priceEnergy: priceEnergy,
    totalPrice: totalPrice,
    UserUserId: 1,
    publishDate: publishDate,
    updateDate: updateDate,
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

controller.update = async (req, res) => {
  if (req.body?.id == null) {
    res.status(400).json({
      success: false,
      message: "Requisição má formulada. Falta o id na requisição",
    });
    return;
  }
  console.log("------------------");
  console.log(req.body);

  const updateDate = new Date();

  try {
    const offerUpdate = await Offer.update(
      {
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        priceEnergy: req.body.priceEnergy,
        updateDate: updateDate,
      },
      {
        where: { offerId: req.body.id },
      }
    );
    console.log("offerUpdate", offerUpdate);

    if (offerUpdate == 1) {
      res.status(200).json({
        success: true,
        message: "Oferta atualizada com sucesso",
      });
    } else if (offerUpdate == 0) {
      res.status(400).json({
        success: false,
        message: "Requisição má formulada. Verifique os campos",
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
