const BreakDown = require('../../models/breakdown');
const Driver = require('../../models/driver');


const {transformBreakdown} = require('./merge');



module.exports = {
    breakdowns: async () => {
        try {
            const breakdowns = await BreakDown.find();
            return breakdowns.map(breakdown => {
                return transformBreakdown(breakdown);
                

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
                createdBreakdown = transformBreakdown(result);
            
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

    

    
};



