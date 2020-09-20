const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const BreakDown = require('../../models/breakdown');
const Driver = require('../../models/driver');



const breakdowns = async breakdownIds => {
    try {
        const breakdowns = await BreakDown.find({ _id: { $in: breakdownIds } });
        return breakdowns.map(breakdown => {
            return {
                ...breakdown._doc,
                _id: breakdown.id,
                time_of_accident: new Date(breakDown._doc.time_of_accident).toISOString,
                creator: driver.bind(this, breakdown.creator)
            };
        });
    } catch (err) {
        throw err;
    }
};

const driver = async driverId => {
    try {
        const driver = await Driver.findById(driverId)
        return {
            ...driver._doc,
            id: driver.id,
            time_of_accident: new Date(breakDown._doc.time_of_accident).toISOString,
            createdBreakdowns: breakdowns.bind(this, driver._doc.createdBreakdowns)
        };
    } catch (err) {
        throw error;
    }
};




module.exports = {
    breakdowns: async () => {
        try {
            const breakdowns = await BreakDown.find()
            return breakdowns.map(breakdown => {
                return {
                    ...breakdown._doc,
                    _id: breakdown._doc._id.toString(),
                    creator: driver.bind(this, breakdown._doc.creator)
                };

            })
        } catch (err) {
            throw err
        }
    },
    createBreakDown: async (args) => {
        const breakDown = new BreakDown({
            time_of_accident: new Date(args.breakdownInput.time_of_accident),
            driver_comment: args.breakdownInput.driver_comment,
            type_of_breakdown: args.breakdownInput.type_of_breakdown,
            location: args.breakdownInput.location,
            license_plate: args.breakdownInput.license_plate,
            creator: '5f64eb116dca91accffcfd3e'
        })
        let createdbreakdown;
        try{
        const result = await breakDown
            .save()
                createdbreakdown = {
                    ...result._doc,
                    _id: result._doc._id.toString(),
                    creator: breakdown.bind(this, result._doc.creator)
                };
            
            const creator = await Driver.findById('5f64eb116dca91accffcfd3e');
                if (!creator) {
                    throw new Error("driver not found");
                }
                creator.createdBreakdowns.push(breakDown);
                await creator.save();
                return createdbreakdown;
           } catch (err){ 
                console.log(err)
                throw err;
            };
    },
    createDriver: async args => {
        try{ 
        const existingdriver= await Driver.findOne({ email: args.driverInput.email })
            
                if (existingdriver) {
                    throw new Error("driver exists already");
                }
                const hashedPassword = await bcrypt.hash(args.driverInput.password, 12);
         
                const driver = new Driver({
                    email: args.driverInput.email,
                    password: hashedPassword,
                    phoneNumber: args.driverInput.phoneNumber
                })
                const result = await driver.save();
          
                return { ...result._doc, password: null, _id: result.id }
            } catch(err){
                console.log(err)
            }         
    }
}

