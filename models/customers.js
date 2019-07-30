const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 }
});

const Customer = mongoose.model("Customer", customerSchema);

const validateFunc = obj => {
  console.log("from validate func", obj);

  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(obj, schema);
};
module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validateFunc = validateFunc;
