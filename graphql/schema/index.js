const { buildSchema } = require('graphql');

module.exports = buildSchema(` 
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
                phoneNumber: String!
                fullName: String!
                createdBreakdowns:[BreakDown!]
                accountType: String
                
            }

            type Location{
                location: Float
            }

            type Mechanic{
                _id: ID!
                email: String!
                password: String
                fullName: String!
                phoneNumber: String!
                company_name: String!
                company_img: String!
                company_relative_location: String
                company_absolute_location: [Location]
                accountType: String
                
            }

            type AuthDriverData{
                driverId : ID!
                token: String!
                tokenExpiration : Int!
                fullName: String!
                accountType: String

            }

            input BreakDownInput{
                time_of_accident: String!
                 driver_comment: String
                 type_of_breakdown: String!
                 location: String
                 license_plate: String!
            }

            input DriverInput{
                email: String!
                fullName: String!
                password: String!
                phoneNumber: String!

            }

            input MechanicInput{
                email: String!
                password: String!
                phoneNumber: String!
                fullName: String!
                company_name: String!
                company_img: String!
                company_relative_location: String
                company_absolute_location: String!

            }

            type RootQuery{
                    breakdowns:[BreakDown!]!
                    login(email: String!, password: String!): AuthDriverData!
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
