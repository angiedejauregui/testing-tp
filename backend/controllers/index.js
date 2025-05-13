const register = require("./register");
const login = require("./login");
const getUserById = require("./getUserById");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");

module.exports = {
  register,
  login,
  getUserById,
  forgotPassword,
  resetPassword,
};