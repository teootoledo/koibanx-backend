const logger = require("../utils/logger");
const express = require("express");
const router = express.Router();

const { createStore, getStores } = require("../drivers/store");

router.route("/stores").post(createStore);
router.route("/stores").get(getStores);

module.exports = router;
