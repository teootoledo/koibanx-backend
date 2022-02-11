const ValidateGetStoresError = require("../errors/ValidateGetStoresError.js");

const validateGetStores = (req, res, next) => {
  try {
    const query = req.query;
    validatePage(query.page);
    validateLimit(query.limit);

    next();
  } catch (err) {
    next(err);
  }
};

const validatePage = (page) => {
  if (!page) return;
  if (typeof Number(page) != "number")
    throw new ValidateGetStoresError("page must be a number");
};

const validateLimit = (limit) => {
  if (!limit) return;
  if (typeof Number(limit) != "number")
    throw new ValidateGetStoresError("limit must be a number");
};

module.exports = { validateGetStores };
