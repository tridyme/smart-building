const mongoose = require('mongoose');

let SiteSchema = new mongoose.Schema({
  name: String,
  adress: String,
  location: String,
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }]
},
  { _id: true },
  { timestamps: true }
);

module.exports = mongoose.model('BuildingSchema', BuildingSchema);