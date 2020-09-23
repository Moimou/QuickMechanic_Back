const bcrypt = require('bcryptjs');


const Driver = require('../../models/driver');



module.exports = {
    

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

    
};