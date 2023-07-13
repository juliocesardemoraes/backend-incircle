const express = require("express");
const router = express.Router();
const infrastructureController = require("../controllers/infrastructureController");

router.post("/create", infrastructureController.create);

module.exports = router;
