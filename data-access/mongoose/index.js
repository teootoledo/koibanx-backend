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
  try {
    const newStore = store.create({
      name,
      cuit,
      concepts,
      currentBalance,
      active,
      lastSale,
    });

    return newStore;
  } catch (error) {
    console.log(error);
  }
};

const obtainStores = async (page, limit) => {
  try {
    const options = {
      page,
      limit,
      customLabels: {
        docs: "data",
        page: "page",
        totalPages: "pages",
        limit: "limit",
        totalDocs: "total",
      },
    };
    const res = await store.paginate({}, options);

    return {
      data: res.data,
      page: res.page,
      pages: res.pages,
      limit: res.limit,
      total: res.total,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  persistStore,
  obtainStores,
};
