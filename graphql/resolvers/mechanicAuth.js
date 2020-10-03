const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Mechanic = require('../../models/mechanic');



module.exports = {
    

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
                    fullName: args.mechanicInput.fullName,
                    phoneNumber: args.mechanicInput.phoneNumber,
                    accountType: "Mechanic",
                    company_name: args.mechanicInput.company_name,
                    company_img: args.mechanicInput.company_img,
                    company_relative_location: args.mechanicInput.company_relative_location,
                    company_absolute_location_lon: args.mechanicInput.company_absolute_location_lon,
                    company_absolute_location_lat: args.mechanicInput.company_absolute_location_lat
                })
                const result = await mechanic.save();
          
                return { ...result._doc, password: null, _id: result.id }
            } catch(err){
                throw err;
            }         
    },
    loginMechanic: async ({email,password}) =>{

        const mechanic = await Mechanic.findOne({email:email});
        if(!mechanic){
            throw new Error ('Mechanic does not exist');
        }
       const isEqual = await bcrypt.compare(password, mechanic.password);
       
       if(!isEqual){
        throw new Error ('Password is incorrect');
        }
        const token = jwt.sign({mechanicId: mechanic.id, email: mechanic.email, fullName: mechanic.fullName, accountType:mechanic.accountType},'teamtwonineonegroupasupersecretkey',{
            expiresIn:'1h'
        });
        return {mechanicId: mechanic.id, token: token, tokenExpiration:1, fullName: mechanic.fullName, accountType:mechanic.accountType  }
    }
}; 


