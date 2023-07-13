const { genSalt, hash, compare } = require("bcrypt");

const cryptoPassword = async (password) => {
  const salt = await genSalt();
  const hashPass = await hash(password, salt);
  return hashPass;
};

const comparePassword = async (password, userHash) => {
  const isMatch = await compare(password, userHash);
  return isMatch;
};

module.exports = { cryptoPassword, comparePassword };
