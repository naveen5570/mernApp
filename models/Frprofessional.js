// models/Book.js

const mongoose = require('mongoose');

const ProfessionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  description:{
type:String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo_id: {
    type: String
  },
  registered_address: {
    type: String
  },
  office_address: {
    type: String
  },
  country: {
    type: String
  },
  city:{type: String},
  zipcode:{type: String},
  specialisation:{type:Array},
  experience:{type:String},
  qualification:{type:String},
  standard_fees:{type:String},
  state_or_province: {
    type: String
  },
  radius_to_cater: {
    type: String
  },
  professional_card: {
    type: String
  },
  availability_hours1: {
    type: String
  },
  availability_hours2: {
    type: String
  },
  status: {
    type: String, default:0
  },
disapproval_reason:{
  type: String, default:''
},  
},{ timestamps: true });

module.exports = Frprofessional = mongoose.model('frprofessional', ProfessionalSchema);