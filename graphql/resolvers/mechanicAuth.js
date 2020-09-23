const bcrypt = require('bcryptjs');


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
                    company_name: args.mechanicInput.company_name,
                    company_img: args.mechanicInput.company_img,
                    company_relative_location: args.mechanicInput.company_relative_location,
                    company_absolute_location: args.mechanicInput.company_absolute_location
                })
                const result = await mechanic.save();
          
                return { ...result._doc, password: null, _id: result.id }
            } catch(err){
                throw err;
            }         
    }
};

