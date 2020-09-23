const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

    login: async ({email,password}) =>{

        const driver = await Driver.findOne({email:email});
        if(!driver){
            throw new Error ('Driver does not exist');
        }
       const isEqual = await bcrypt.compare(password, driver.password);
       
       if(!isEqual){
        throw new Error ('Password is incorrect');
        }
        const token = jwt.sign({driverId: driver.id, email: driver.email},'teamtwonineonegroupasupersecretkey',{
            expiresIn:'1h'
        });
        return {driverId: driver.id, token: token, tokenExpiration:1 }
    }
}; 