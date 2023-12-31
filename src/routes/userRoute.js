const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.create);
router.get("/list", userController.list);
router.delete("/delete", userController.delete);
router.get("/auth", userController.auth);

module.exports = router;
