const Contract = require("../model/Contract");
const Offer = require("../model/Offer");
const Role = require("../model/Role");
const User = require("../model/User");
const UserRole = require("../model/UserRole");
const { checkBody } = require("../utils/checkBody");

const controller = {};

controller.list = async (req, res) => {
  if (req.query.userId) {
    const role = await UserRole.findOne({
      where: { UserUserId: req.query.userId },
    });

    const roleName = await Role.findOne({
      where: { roleId: role.dataValues?.RoleRoleId },
    });

    if (roleName.dataValues.nameRole == "administrador") {
      data = await Contract.findAll({
        where: { sellerId: req.query.userId, status: "pago" },
      });

      if (data.length === 0) {
        return res.status(404).json({
          data: [],
          success: false,
        });
      }

      return res.status(200).json({
        data: [...data],
      });
    } else {
      const condition =
        roleName.dataValues.nameRole === "comprador" ? "buyerId" : "sellerId";

      data = await Contract.findAll({
        where: { [condition]: req.query.userId, status: "pago" },
      });

      if (data.length === 0) {
        return res.status(404).json({
          data: [],
          success: false,
        });
      }

      return res.status(200).json({
        data: [...data],
      });
    }
  }

  if (req.query.sellerId) {
    data = await Contract.findAll({
      where: { sellerId: req.query.sellerId, status: "pago" },
    });

    if (data.length === 0) {
      return res.status(404).json({
        data: [],
        success: false,
      });
    }

    return res.status(200).json({
      data: [...data],
    });
  }

  if (req.query.paid) {
    try {
      let data = [];
      if (req.query.buyerId) {
        data = await Contract.findAll({
          where: { buyerId: req.query.buyerId, status: "pago" },
        });
      }

      if (data.length === 0) {
        return res.status(404).json({
          data: [],
          success: false,
        });
      }

      res.status(200).json({
        data: [...data],
      });
    } catch (error) {
      console.log("ERROR", error);
      res.status(500).json({
        success: false,
        message: "Erro ao tentar achar contratos",
      });
    }
  }

  if (!req.query.paid) {
    try {
      let data = [];
      if (req.query.buyerId) {
        data = await Contract.findAll({
          where: { buyerId: req.query.buyerId, status: "pendente" },
        });
      } else if (req.query.sellerId) {
        data = await Contract.findAll({
          where: { sellerId: req.query.sellerId, status: "pendente" },
        });
      } else {
        data = await Contract.findAll({ where: { status: "pendente" } });
      }

      if (data.length === 0) {
        return res.status(404).json({
          data: [],
          success: false,
        });
      }

      res.status(200).json({
        data: [...data],
      });
    } catch (error) {
      console.log("ERROR", error);
      res.status(500).json({
        success: false,
        message: "Erro ao tentar achar contratos",
      });
    }
  }
};

controller.create = async (req, res) => {
  // data
  const {
    details = "",
    status = "pendente",
    offerId,
    sellerId,
    buyerId,
  } = req.body;

  const isValid = checkBody([offerId, sellerId, buyerId]);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "Requisição má formulada",
    });
  }

  try {
    const offer = await Offer.findOne({
      where: { offerId: offerId },
    });

    const sellerInfo = await User.findOne({
      where: { userId: sellerId },
    });

    const buyerInfo = await User.findOne({
      where: { userId: buyerId },
    });

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Oferta não encontrada",
      });
    }

    const data = await Contract.create({
      contractDate: Date.now(),
      contractDetails: { ...offer.dataValues },
      status: status,
      OfferOfferId: offerId,
      sellerInfo: sellerInfo,
      buyerInfo: buyerInfo,
      sellerId: sellerId,
      buyerId: buyerId,
    });

    if (data) {
      return res.status(200).json({
        success: true,
        message: "Contrato criado",
      });
    }
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor",
    });
  }
  // return res
  return res.status(200).json({
    success: true,
    message: "Contrato Registado",
  });
};

controller.update = async (req, res) => {
  // data
  const { contractID, status, offerOfferId } = req.body;

  const isValid = checkBody([contractID, status]);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "Requisição má formulada",
    });
  }

  try {
    const updatedOffer = Contract.update(
      {
        status: status,
      },
      {
        where: { contractID: contractID },
      }
    );

    if (updatedOffer) {
      const offerDeleted = Offer.destroy({ where: { offerId: offerOfferId } });

      if (offerDeleted) {
        return res.status(200).json({
          success: true,
          message: "Contrato atualizado",
        });
      }
    }
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor",
    });
  }
  // return res
  return res.status(200).json({
    success: true,
    message: "Contrato Registado",
  });
};

controller.delete = async (req, res) => {
  try {
    const deleteContract = await Contract.destroy({
      where: { contractID: req.body.contractId },
    });
    if (deleteContract == 1) {
      return res.status(200).json({
        success: true,
        message: "Deletado com sucesso!",
      });
    } else if (deleteContract == 0) {
      return res.status(400).json({
        success: false,
        message: "Requisição má formulada.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro no servidor",
    });
  }
};

module.exports = controller;
