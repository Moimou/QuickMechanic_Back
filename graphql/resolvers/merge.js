
const BreakDown = require('../../models/breakdown');
const Driver = require('../../models/driver');
const Mechanic = require('../../models/mechanic');

const {dateToString} = require('../../helpers/date');


const transformBreakdown = breakdown =>{
    return {
        ...breakdown._doc,
        _id: breakdown.id,
        time_of_accident:dateToString(breakdown._doc.time_of_accident),
        creator: driver.bind(this, breakdown.creator)
    };
};



const breakdowns = async breakdownIds => {
    try {
        const breakdowns = await BreakDown.find({ _id: { $in: breakdownIds } });
        breakdowns.map(breakdown => {
            return transformBreakdown(breakdown);
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
        const mechanic = await Mechanic.findById(mechanicId)
        return {
            ...mechanic._doc,
            id: mechanic.id,
           // createdBreakdowns: mechanic.bind(this, driver._doc.createdBreakdowns)
        };
    } catch (err) {
        throw error;
    }
};



exports.transformBreakdown = transformBreakdown;