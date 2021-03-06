const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({
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
    createdBreakdowns:[
        {
            type: Schema.Types.ObjectId,
            ref:'BreakDown'
        }
    ]
})



module.exports = mongoose.model('Driver', driverSchema);