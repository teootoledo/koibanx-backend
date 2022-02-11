const { obtainUser } = require("../data-access/mongoose");

const getUser = (username) => {
  try {
    const user = obtainUser(username);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser };
