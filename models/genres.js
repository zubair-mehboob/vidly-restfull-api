const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genresSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model("Genre", genresSchema);

const validateFunc = obj => {
  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate(obj, schema);
};

module.exports.Genre = Genre;
module.exports.validateFunc = validateFunc;
module.exports.genresSchema = genresSchema;
