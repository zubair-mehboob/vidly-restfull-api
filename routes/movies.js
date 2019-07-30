const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  numberInStock: { type: Number, default: 0 },
  dailyRentalRate: { type: Number, default: 0 }
});
const Movie = mongoose.model("Movie", movieSchema);
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});
router.post("/", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  const result = await movie.save();
  res.send(result);
});

const validateFunc = obj => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    dailyRentalRate: Joi.number(),

    numberInStock: Joi.number()
  };
};
module.exports = router;
