const logger = require("../utils/logger");
const express = require("express");
const router = express.Router();

const { createStore } = require("../drivers/store");

/* router.route('/stores')
  .get(function(){logger.info("pending validations")}, function(){logger.info("pending use case")}); */

router.route("/stores").post(createStore);

module.exports = router;
