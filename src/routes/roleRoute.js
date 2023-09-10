const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.get("/list", roleController.list);
router.post("/create", roleController.create);

module.exports = router;
