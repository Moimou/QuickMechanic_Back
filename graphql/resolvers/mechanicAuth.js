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
                    phoneNumber: args.mechanicInput.phoneNumber
                })
                const result = await mechanic.save();
          
                return { ...result._doc, password: null, _id: result.id }
            } catch(err){
                throw err;
            }         
    }
};

