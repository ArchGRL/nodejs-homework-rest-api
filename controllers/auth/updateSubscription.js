const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(_id, { subscription });
  if (!user) {
    throw HttpError(401, "Not authorized ctrl");
  }

  res.status(201).json({
    message: `Subscription status changed to ${subscription}`,
  });
};

module.exports = updateSubscription;
