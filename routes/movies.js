const express = require("express");
const router = express.Router();
const { validateFunc, Movie } = require("../models/movies");
const { Genre } = require("../models/genres");
// const mongoose = require("mongoose");
// const Joi = require("@hapi/joi");
// const movieSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   numberInStock: { type: Number, default: 0 },
//   dailyRentalRate: { type: Number, default: 0 }
// });
// const Movie = mongoose.model("Movie", movieSchema);
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});
router.post("/", async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);

  if (!genre) return res.status(404).send("Genre not found");

  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  });

  const { error } = validateFunc(req.body);
  console.log("apna error", error);

  if (error) return res.status(400).send(error);
  try {
    const result = await movie.save();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Genre not found");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        _id: genre._id,
        name: genre.name
      }
    },

    { new: true }
  );

  if (!movie) return res.status(404).send("Movie not found");
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  res.send(movie);
});
// const validateFunc = obj => {
//   const schema = {
//     title: Joi.string()
//       .min(5)
//       .max(50)
//       .required(),
//     dailyRentalRate: Joi.number(),

//     numberInStock: Joi.number()
//   };
// };
module.exports = router;
