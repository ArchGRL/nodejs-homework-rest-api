const express = require("express");

const ctrl = require("../../../controllers/contacts/index");

const {validateBody, isValidId, authenticate} = require("../../../middlewares");

const {schemas} = require("../../../models/contact/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema, "missing required name field"), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.addSchema, "missing fields"), ctrl.updateById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateStatusSchema, "missing field favorite"), ctrl.updateStatusContact);

module.exports = router;