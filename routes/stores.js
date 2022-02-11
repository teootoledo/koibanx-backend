const logger = require("../utils/logger");
const express = require("express");
const router = express.Router();

const { basicAuth } = require("../utils/middlewares/basicAuth");
const { createStore, getStores } = require("../drivers/store");
const { validateGetStores } = require("../utils/middlewares/validateGetStores");
const { validateCreateStore } = require("../utils/middlewares/validateCreateStore");

router.route("/stores").post(validateCreateStore, basicAuth, createStore);
router.route("/stores").get(validateGetStores, basicAuth, getStores);

module.exports = router;
