var User = require("../model/User");
var Offer = require("../model/Offer");
var Payment = require("../model/Payment");
var PaymentMethod = require("../model/PaymentMethod");
var Infrastructure = require("../model/Infrastructure");
var Role = require("../model/Role");
var UserRole = require("../model/UserRole");
var Contract = require("../model/Contract");
var sequelize = require("../model/database");

const controller2 = {};
//sequelize.sync()

controller2.list = async (req, res) => {
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

controller2.create = async (req, res) => {
  // data
  const { quantity, priceEnergy, totalPrice, UserUserId } = req.body;
  const publishDate = new Date();
  // create
  const data = await Offer.create({
    quantity: quantity,
    priceEnergy: priceEnergy,
    totalPrice: totalPrice,
    UserUserId: 2,
    publishDate: publishDate,
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

module.exports = controller2;
