const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30
  },
  occupation: {
    type: String,
    required: true,
    maxlength: 30
  },
  catchPhrase: {
    type: String,
    required: true,
    maxlength: 100
  }
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
