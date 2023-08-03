const express = require("express");

const ctrl = require("../../../controllers/auth")

const {validateBody, authenticate} = require("../../../middlewares");

const {schemas} = require("../../../models/user/user")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema, "Incorrectly filled fields"), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema, "Incorrectly filled fields"), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.subscriptionSchema, "This type of subscription does not exist"), ctrl.updateSubscription);

module.exports = router;

