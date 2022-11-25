// models/Book.js

const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  banner: {
    type: String
  },
  banner_h1: {
    type: String
  },
  banner_h2: {
    type: String
  },
  banner_h3: {
    type: String
  },
  banner_link: {
    type: String
  },
  how_heading: {
    type: String
  },
  how_description: {
    type: String
  },
  how_1_heading: {
    type: String
  },
  how_1_description: {
    type: String
  },
  how_2_heading: {
    type: String
  },
  how_2_description: {
    type: String
  },
  how_3_heading: {
    type: String
  },
  how_3_description: {
    type: String
  },
  services_heading: {
    type: String
  },
  services_description: {
    type: String
  },
  section_1_heading: {
    type: String
  },
  section_1_description: {
    type: String
  },
  section_1_link: {
    type: String
  },
},{ timestamps: true });

module.exports = User = mongoose.model('home', HomeSchema);