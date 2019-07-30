const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { genresSchema, Genre } = require("./genres");
const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  numberInStock: { type: Number, default: 0 },
  dailyRentalRate: { type: Number, default: 0 },
  genre: { type: genresSchema, required: true }
});
const Movie = mongoose.model("Movie", movieSchema);

const validateFunc = obj => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    dailyRentalRate: Joi.number(),

    numberInStock: Joi.number(),
    genreId: Joi.string().required()
  };
  return Joi.validate(obj, schema);
};

module.exports.validateFunc = validateFunc;
module.exports.Movie = Movie;
