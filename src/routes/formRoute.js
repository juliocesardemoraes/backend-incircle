const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/create", formController.create);

module.exports = router;
