const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  dimensions:{
    type: Number,
    required: true
  },
  SqArea: {
    type: Number,
    required: true
  }
  // owner: {
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   email: {
  //     type: String,
  //     required: true
  //   },
  //   phone: {
  //     type: String,
  //     required: true
  //   }
  // },
  // publicAddress: {
  //   type: String,
  //   required: true
  // }
});

const Property = mongoose.model('property', propertySchema);
