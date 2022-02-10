const { persistStore } = require("../data-access/mongoose");

const createStore = async (req, res) => {
  try {
    const { name, cuit, concepts, currentBalance, active, lastSale } = req.body;
    const newStore = await persistStore(
      name,
      cuit,
      concepts,
      currentBalance,
      active,
      lastSale
    );
    res.json(newStore);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createStore,
};
