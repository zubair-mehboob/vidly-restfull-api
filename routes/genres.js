const express = require("express");
//const mongoose = require("mongoose");
const router = express.Router();

const { Genre, validateFunc } = require("../models/genres");
// const Joi = require("@hapi/joi");

// const genresSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   }
// });

// const Genre = mongoose.model("Genre", genresSchema);

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  console.log(genre);

  if (!genre) return res.status(404).send("Genere not found");
  res.send(genre);
});

router.post("/", async (req, res) => {
  console.log("req.body", req.body);
  const movie = new Genre({
    name: req.body.name
  });

  const { error, value } = validateFunc(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const newMovie = await movie.save();
    res.send(newMovie);
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const updateGenre = await Genre.findById(req.params.id);

  if (!updateGenre) return res.status(404).send(new Error("Genre not found"));

  updateGenre.name = req.body.name || updateGenre.name;

  console.log("Just Before save: ", updateGenre);

  try {
    const result = await updateGenre.save();
    res.send(result);
  } catch (er) {
    for (field in er.errors) res.send(er.errors[field].message);
  }
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  res.send(genre);
});

// const validateFunc = obj => {
//   const schema = {
//     name: Joi.string().required()
//   };

//   return Joi.validate(obj, schema);
// };

module.exports = router;
