const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// create geolocation Schema
/*const GeoSchema = new Schema({
  
    type: {
      type: String,
      enum: ['Point'],
      required:false
  },
  coordinates: {
      type: [Number],
      index: '2dsphere',
      required: true
  }

});*/
// create mechanic Schema & model
const mechanicSchema = new Schema({
    email:{
        type: String,
        required:true
    },
    fullName:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    accountType:{
      type: String,
      required:false
  },
    company_name: {
        type: String,
        required: true
      },
      company_img: {
        type: String,
        required: false
      },
      company_relative_location: {
        type: String,
        required: false
      },
      company_absolute_location_lon: {
        type: [Number],
        required: false
      },
      company_absolute_location_lat: {
        type: [Number],
        required: false
      }

})



module.exports = mongoose.model('Mechanic', mechanicSchema);