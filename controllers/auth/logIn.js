const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if(!user.verify) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3w" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription: "starter"
    }
  });
};

module.exports = logIn;
