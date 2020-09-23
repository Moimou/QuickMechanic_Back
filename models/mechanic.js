const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
        type: Number,
        required: true
    },
    company_name: {
        type: String,
        required: true
      },
      company_img: {
        type: String,
        required: true
      },
      company_relative_location: {
        type: String,
        required: false
      },
      company_absolute_location: {
        type: String,
        required: true
      }

})



module.exports = mongoose.model('Mechanic', mechanicSchema);