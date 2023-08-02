const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId} = require("../../middlewares");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema, "missing required name field"), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema, "missing fields"), ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateStatusSchema, "missing field favorite"), ctrl.updateStatusContact);

module.exports = router;
