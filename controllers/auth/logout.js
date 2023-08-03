const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: "" });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.status(201).json({
    message: "No Content",
  });
};

module.exports = logout;
