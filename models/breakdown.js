const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const breakdownSchema = new Schema({
    time_of_accident:{
        type: String,
        required:true
    },
    driver_comment:{
        type: String,
        required: false
    },
    type_of_breakdown:{
        type: String,
        required: true
    },
    location_lon:{
        type: [Number],
        required:true
    },
    location_lat:{
        type: [Number],
        required:true
    },
    license_plate:{
        type: String,
        required:true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    listOfAllMechanic: [
        {
            type: Schema.Types.ObjectId,
            ref:'Mechanic'
        }
    ]
    
});

module.exports = mongoose.model('BreakDown', breakdownSchema);

