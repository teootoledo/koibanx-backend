const store = require("../../models/store");
const { formatStores } = require("../../utils/formatter");

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

const obtainStores = async (page, limit) => {
  const totalStores = await store.countDocuments();
  const docsToSkip = (page - 1) * limit;
  const stores = await store.find().skip(docsToSkip).limit(limit);
  const storesWithPagination = {
    data: formatStores(stores),
    page,
    pages: Math.ceil(totalStores / limit),
    limit: limit,
    total: totalStores,
  };

  return storesWithPagination;
};

module.exports = {
  persistStore,
  obtainStores,
};
