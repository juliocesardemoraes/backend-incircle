const express = require("express");
const router = express.Router();
const contractControler = require("../controllers/contractController");

router.post("/create", contractControler.create);
router.post("/update", contractControler.update);
router.get("/list", contractControler.list);

module.exports = router;
