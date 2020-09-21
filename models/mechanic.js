const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mechanicSchema = new Schema({
    email:{
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
    }

})



module.exports = mongoose.model('Mechanic', mechanicSchema);