const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, UniqueDirectiveNamesRule } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const BreakDown = require('./models/breakdown');
const Driver = require('./models/driver');


const app = express();


app.use(bodyParser.json());

const breakdowns = breakdownIds =>{
    return BreakDown.find({ _id: { $in: breakdownIds }})
    .then(breakdowns => {
        return breakdowns.map(breakdown =>{
            return { ...breakdown._doc,  
                _id: breakdown.id,
                 creator: driver.bind(this, breakdown.creator)};
        })
    })
    .catch(err =>{
        throw err;
    })
}

const driver = driverId => {
    return Driver.findById(driverId)
    .then(driver => {
        return {...driver._doc, id: driver.id, createdBreakdowns:breakdowns.bind(this, driver._doc.createdBreakdowns)};
    })
    .catch(error =>{throw error;})
}

app.use('/graphql',
    graphqlHTTP({
        schema: buildSchema(` 
            type BreakDown{
                _id: ID!
                time_of_injury: String!
                driver_comment: String
                # vehicle can have multiple faliure types
                type_of_breakdown: String!
                location: String!
                license_plate: String!
                creator: Driver!
            }

            type Driver{
                _id: ID!
                email: String!
                password: String
                phoneNumber: Float!
                createdBreakdowns:[BreakDown!]
                
            }

            input BreakDownInput{
                time_of_injury: String!
                 driver_comment: String
                 type_of_breakdown: String!
                 location: String!
                 license_plate: String!
            }

            input DriverInput{
                email: String!
                password: String!
                phoneNumber: Float!

            }

            type RootQuery{
                    breakdowns:[BreakDown!]!
            }
            type RootMutation{
                createBreakDown(breakdownInput : BreakDownInput ): BreakDown
                createDriver(driverInput : DriverInput ) : Driver
            }
                schema{
                    query: RootQuery
                    mutation: RootMutation
                }
            `),
        rootValue: {
            breakdowns: () => {
                return BreakDown.find()
                    .then(breakdowns => {
                        return breakdowns.map(breakdown => {
                            return { 
                                ...breakdown._doc, 
                                _id: breakdown._doc._id.toString(),
                                creator:driver.bind(this, breakdown._doc.creator)  
                            };
                        });
                    })
                    .catch(err=> {
                        console.log(err)
                    });
            },
            createBreakDown: args => {

                const breakDown = new BreakDown({
                    time_of_accident: new Date(args.breakdownInput.time_of_injury),
                    driver_comment: args.breakdownInput.driver_comment,
                    type_of_breakdown: args.breakdownInput.type_of_breakdown,
                    location: args.breakdownInput.location,
                    license_plate: args.breakdownInput.license_plate,
                    creator:'5f64eb116dca91accffcfd3e'
                })
                let createdbreakdown;
                return breakDown
                    .save()
                    .then(result => {
                        createdbreakdown = { ...result._doc, 
                            _id: result._doc._id.toString(), 
                            creator:breakdown.bind(this, result._doc.creator) };
                        return Driver.findById('5f64eb116dca91accffcfd3e');
                    })
                    .then(driver =>{
                        if(!driver){
                            throw new Error ("driver not found");
                        }
                        driver.createdBreakdowns.push(breakDown);
                        return driver.save();
                    })
                    .then(result =>{
                        return createdbreakdown;
                    })
                    .catch(err => {
                        console.log(err)
                        throw err;
                    });
            },
            createDriver : args => {
                return Driver.findOne({email:args.driverInput.email})
                .then(driver =>{
                    if(driver){
                        throw new Error ("driver exists already");
                    }
                    return bcrypt.hash(args.driverInput.password, 12);
                })
                .then((hashedPassword)=>{
                    const driver = new Driver({
                        email: args.driverInput.email,
                        password: hashedPassword,
                        phoneNumber: args.driverInput.phoneNumber
                    })
                    return driver.save();
                })
                .then(result => {
                    return {...result._doc, password:null, _id:result.id}

                })
                .catch(err=>{console.log(err)})                  
            }
        },

        graphiql: true,

    })
);
// mongodb+srv://Sandra:<password>@cluster0.81el4.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://${process.env.MONGO_USER}:${process.env.MONG0_PASSWORD}@cluster0.81el4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://Sandra:L5ZnZ4LfjAvzHWSV@cluster0.81el4.mongodb.net/mechanic-react-dev?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000);
    })
    .catch((error) => { console.log(error); })

