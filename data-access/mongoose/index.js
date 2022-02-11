const store = require("../../models/store");
const user = require("../../models/user");
const { formatStores, storeFormatter } = require("../../utils/formatter");

const persistStore = async (data) => {
  try {
    const newStore = store.create({ _id: data.id, ...data });

    return storeFormatter(newStore);
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
      data: formatStores(res.data),
      page: res.page,
      pages: res.pages,
      limit: res.limit,
      total: res.total,
    };
  } catch (error) {
    console.log(error);
  }
};

const obtainUser = async (username) => {
  try {
    const userFound = await user.findOne({ username });
    return userFound;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  persistStore,
  obtainStores,
  obtainUser,
};
