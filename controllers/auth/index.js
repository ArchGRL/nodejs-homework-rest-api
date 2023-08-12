const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const logIn = require("./logIn");
const getCurrent = require("./current");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
