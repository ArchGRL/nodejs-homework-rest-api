const {Schema, model} = require("mongoose");

const Joi = require("joi");

const constSchema = new Schema(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      }, { versionKey: false, timestamps: true }
);

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean(),
});

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

const schemas = {
    addSchema,
    updateStatusSchema,
  }

const Contact = model("contact", constSchema);

module.exports = {
    Contact,
    schemas,
};