const { User } = require("../../models/user/user");

const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async(req, res) => {
const {email} = req.body;
const user = User.findOne({email});
if(!user) {
    throw HttpError(400, "missing required field email");
}
if(user.verify) {
    throw HttpError(400, "Verification has already been passed");
}

const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click verify email</a>`
  };

await sendEmail(verifyEmail);

  res.status(200).json({
    "message": "Verification email sent",
  });
};

module.exports = resendVerifyEmail;