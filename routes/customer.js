const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { validateFunc, Customer } = require("../models/customers");
//const Joi = require("@hapi/joi");

// const customerSchema = mongoose.Schema({
//   isGold: { type: Boolean, default: false },
//   name: { type: String, required: true, minlength: 5, maxlength: 50 },
//   phone: { type: String, required: true, minlength: 5, maxlength: 50 }
// });

// const Customer = mongoose.model("Customer", customerSchema);
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.post("/", async (req, res) => {
  console.log(req.body);

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  const { error } = validateFunc(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await customer.save();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("customer not found");
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateFunc(req.body);
  //if (error) return res.status(400).send(error);
  //console.log(req.body);

  try {
    const customer = await Customer.findById(req.params.id);
    customer.name = req.body.name || customer.name;
    customer.isGold = req.body.isGold || customer.isGold;
    customer.phone = req.body.phone || customer.phone;
    const result = await customer.save();
    res.send(result);
  } catch (er) {
    //console.log(er.message);
    res.status(400).send(er.message);
  }
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");
  res.send(customer);
});

// const validateFunc = obj => {
//   console.log("from validate func", obj);

//   const schema = {
//     name: Joi.string()
//       .min(5)
//       .max(50)
//       .required(),
//     phone: Joi.string()
//       .min(5)
//       .max(50)
//       .required(),
//     isGold: Joi.boolean()
//   };

//   return Joi.validate(obj, schema);
// };

module.exports = router;
