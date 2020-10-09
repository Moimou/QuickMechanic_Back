const BreakDown = require('../../models/breakdown');
const Driver = require('../../models/driver');
const Mechanic = require('../../models/mechanic');

const { transformBreakdown } = require('./merge');



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
    createBreakDown: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const breakdown = new BreakDown({
            time_of_accident: new Date(args.breakdownInput.time_of_accident),
            driver_comment: args.breakdownInput.driver_comment,
            type_of_breakdown: args.breakdownInput.type_of_breakdown,
            location_lon: args.breakdownInput.location_lon,
            location_lat: args.breakdownInput.location_lat,
            license_plate: args.breakdownInput.license_plate,
            creator: '5f763369c6af2b00175c3d24'
        })
        let createdBreakdown;

        try {
            const result = await breakdown.save();
            createdBreakdown = transformBreakdown(result);

            const listOfAllMechanic = await Mechanic.find();
            const creator = await Driver.findById('5f763369c6af2b00175c3d24');



            if (!creator) {
                throw new Error("driver not found");
            }
            creator.createdBreakdowns.push(breakdown);
            await creator.save();

            return{createdBreakdown, listOfAllMechanic};

            //return createdBreakdown;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },




};



