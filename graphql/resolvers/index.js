const bcrypt = require('bcryptjs');

const BreakDown = require('../../models/breakdown');
const Driver = require('../../models/driver');
const Mechanic = require('../../models/mechanic');



const breakdowns = async breakdownIds => {
    try {
        const breakdowns = await BreakDown.find({ _id: { $in: breakdownIds } });
        breakdowns.map(breakdown => {
            return {
                ...breakdown._doc,
                _id: breakdown.id,
                time_of_accident: new Date(breakdown._doc.time_of_accident).toISOString,
                creator: driver.bind(this, breakdown.creator)
            };
        });
        return breakdowns;
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
            createdBreakdowns: breakdowns.bind(this, driver._doc.createdBreakdowns)
        };
    } catch (err) {
        throw error;
    }
};

const mechanic = async mechanicId => {
    try {
        const mechanic = await Driver.findById(mechanicId)
        return {
            ...mechanic._doc,
            id: mechanic.id,
            createdBreakdowns: mechanic.bind(this, driver._doc.createdBreakdowns)
        };
    } catch (err) {
        throw error;
    }
};



module.exports = {
    breakdowns: async () => {
        try {
            const breakdowns = await BreakDown.find();
            return breakdowns.map(breakdown => {
                return {
                    ...breakdown._doc,
                    _id: breakdown.id,
                    time_of_accident: new Date(breakdown._doc.time_of_accident).toISOString,
                    creator: driver.bind(this, breakdown._doc.creator)
                };

            });
        } catch (err) {
            throw err;
        }
    },
    createBreakDown: async (args) => {
        const breakdown = new BreakDown({
            time_of_accident: new Date(args.breakdownInput.time_of_accident),
            driver_comment: args.breakdownInput.driver_comment,
            type_of_breakdown: args.breakdownInput.type_of_breakdown,
            location: args.breakdownInput.location,
            license_plate: args.breakdownInput.license_plate,
            creator: '5f64eb116dca91accffcfd3e'
        })
        let createdBreakdown;
        try{
        const result = await breakdown.save();
                createdBreakdown = {
                    ...result._doc,
                    _id: result._doc._id.toString(),
                    time_of_accident: new Date(breakdown._doc.time_of_accident).toISOString,
                    creator: breakdown.bind(this, result._doc.creator)
                };
            
            const creator = await Driver.findById('5f64eb116dca91accffcfd3e');

                if (!creator) {
                    throw new Error("driver not found");
                }
                creator.createdBreakdowns.push(breakdown);
                await creator.save();

                return createdBreakdown;
           } catch (err){ 
                console.log(err);
                throw err;
            }
    },

    createDriver: async args => {
        try{ 
        const existingDriver= await Driver.findOne({ email: args.driverInput.email });
            
                if (existingDriver) {
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
                throw err;
            }         
    },

    createMechanic: async args => {

        try{ 
        const existingMechanic= await Mechanic.findOne({ email: args.mechanicInput.email });
            
                if (existingMechanic) {
                    throw new Error("mechanic exists already");
                }
                const hashedPassword = await bcrypt.hash(args.mechanicInput.password, 12);
         
                const mechanic = new Mechanic({
                    email: args.mechanicInput.email,
                    password: hashedPassword,
                    phoneNumber: args.mechanicInput.phoneNumber
                })
                const result = await mechanic.save();
          
                return { ...result._doc, password: null, _id: result.id }
            } catch(err){
                throw err;
            }         
    }
};

