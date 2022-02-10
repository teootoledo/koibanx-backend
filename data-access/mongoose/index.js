const store = require("../../models/store");

const getStores = async (req, res) => {
  const stores = await store.find({});
  res.json(stores);
};

const persistStore = async (
  name,
  cuit,
  concepts,
  currentBalance,
  active,
  lastSale
) => {
  const newStore = store.create({
    name,
    cuit,
    concepts,
    currentBalance,
    active,
    lastSale,
  });

  return newStore;
};

module.exports = {
  getStores,
  persistStore,
};
