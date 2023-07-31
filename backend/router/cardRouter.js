const express = require("express");
const { cardVerificaiton } = require("../controllers/cardVerification");

const router = express.Router();

router.route("/verify-card").post(cardVerificaiton);

module.exports = router;
