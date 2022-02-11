const auth = require("basic-auth");
const AuthError = require("../errors/AuthError");
const { getUser } = require("../../drivers/user");

const basicAuth = async (req, res, next) => {
  try {
    const user = auth(req);

    if (!user) {
      throw new AuthError("invalid user or password");
    }

    const userFound = await getUser(user.name);
    if (!userFound) {
      throw new AuthError("invalid user or password");
    }
    console.log(user.pass);
    if (userFound.verifyPassword(user.pass)) {
      next();
    } else {
      throw new AuthError("invalid user or password");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { basicAuth };
