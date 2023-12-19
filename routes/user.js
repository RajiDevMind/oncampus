const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { register, login, profile } = require("../controller/user");

router.post("/register", register);
router.post("/login", login); //.post("/logout", logout);
router.get("/profile/:id", verifyToken, profile);

module.exports = router;
