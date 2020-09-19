const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({
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
    },
    createdBreakdowns:[
        {
            type: Schema.Types.ObjectId,
            ref:'BreakDown'
        }
    ]
})



module.exports = mongoose.model('Driver', driverSchema);