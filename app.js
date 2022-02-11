const mongoose = require("mongoose");
const logger = require("./utils/logger");
const notFound = require("./utils/middlewares/notFound");
const handleErrors = require("./utils/middlewares/handleErrors");
mongoose.Promise = Promise;

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const config = require("config");
mongoose.connect("mongodb://" + config.get("mongodb.address") + "/" + config.get("mongodb.dbname"), { useNewUrlParser: true, useUnifiedTopology: true });

require("./utils/initializer").init();

app.use(express.json());

app.use("/api", require("./routes/stores"));

app.use(notFound);
app.use(handleErrors);

// Start the server
const server = app.listen(config.get("port"));
logger.info("API initialized on port " + config.get("port"));

module.exports = { app, server };
