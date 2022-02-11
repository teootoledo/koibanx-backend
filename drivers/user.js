const { obtainUser } = require("../data-access/mongoose");

const getUser = (username) => {
  try {
    console.log(username);
    const user = obtainUser(username);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser };
