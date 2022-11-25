// models/Book.js

const mongoose = require('mongoose');

const PhomeSchema = new mongoose.Schema({
  banner: {
    type: String
  },
  banner_h1: {
    type: String
  },
  banner_h3: {
    type: String
  },
  banner_link: {
    type: String
  },
  banner_bottom_heading: {
    type: String
  },
  banner_bottom_link: {
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
  services_heading: {
    type: String
  },
  services_description: {
    type: String
  },
  
},{ timestamps: true });

module.exports = Frphome = mongoose.model('frphome', PhomeSchema);