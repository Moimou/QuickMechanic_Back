
const BreakDown = require('../../models/breakdown');
const Driver = require('../../models/driver');
const Mechanic = require('../../models/mechanic');

const {dateToString} = require('../../helpers/date');
const breakdown = require('../../models/breakdown');


const transformBreakdown = breakdown =>{
    return {
        ...breakdown._doc,
        _id: breakdown.id,
        time_of_accident:dateToString(breakdown._doc.time_of_accident),
        creator: driver.bind(this, breakdown.creator),
        listOfAllMechanic: mechanic.bind(this, breakdown.listOfAllMechanic),
        
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
//verifier la fonction ci-dessous avant de decommenter
/*const breakdown = async ()=> {
    try {
        const breakdowns = await BreakDown.find();
        breakdowns.map(breakdown => {
            return transformBreakdown(breakdown);
        });
        return breakdowns;
    } catch (err) {
        throw err;
    }
};*/

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

const mechanic = async() => {
    try {
        const mechanic = await Mechanic.find()
        return {
            ...mechanic._doc,
            id: mechanic.id,
            all_created_breakdowns: breakdowns.bind(this, mechanic._doc.all_created_breakdowns)
        };
    } catch (err) {
        throw error;
    }
};



exports.transformBreakdown = transformBreakdown;