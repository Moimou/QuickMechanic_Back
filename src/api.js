const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema} = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const serverless = require("serverless-http");

const BreakDown = require('../models/breakdown');
const Driver = require('../models/driver');

const app = express();

const router =express.Router();

//router.get('/',(req,res) =>{
  //  res.json({
    //    'hello':'hi!'
   // });
//});

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
mongoose.connect(`mongodb+srv://Sandra:L5ZnZ4LfjAvzHWSV@cluster0.81el4.mongodb.net/mechanic-react-dev?retryWrites=true&w=majority`)
    .then(() => {
        app.use('/.netlify/functions/api', router)
    })
    .catch((error) => { console.log(error); })






module.exports.handler = serverless(app);