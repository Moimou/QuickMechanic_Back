const {buildSchema} = require ('graphql');

module.exports =  buildSchema(` 
            type BreakDown{
                _id: ID!
                time_of_accident: String!
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

            type Mechanic{
                _id: ID!
                email: String!
                password: String
                phoneNumber: Float!
                
            }

            input BreakDownInput{
                time_of_accident: String!
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

            input MechanicInput{
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
                createMechanic(mechanicInput : MechanicInput ) : Mechanic
            }
                schema{
                    query: RootQuery
                    mutation: RootMutation
                }
            `);
   