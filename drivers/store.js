const { persistStore, obtainStores } = require("../data-access/mongoose");

const createStore = async (req, res) => {
  try {
    const newStore = await persistStore(req.body);
    res.json(newStore);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getStores = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const stores = await obtainStores(parseInt(page), parseInt(limit));
    res.json(stores);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createStore,
  getStores,
};
