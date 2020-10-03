const { buildSchema } = require('graphql');

module.exports = buildSchema(` 
            type BreakDown{
                _id: ID!
                time_of_accident: String!
                driver_comment: String
                # vehicle can have multiple faliure types
                type_of_breakdown: String!
                location_lon: [Float]
                location_lat: [Float]
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
                company_absolute_location_lon: [Float]
                company_absolute_location_lat: [Float]
                accountType: String
                
            }

            type AuthDriverData{
                driverId : ID!
                token: String!
                tokenExpiration : Int!
                fullName: String!
                accountType: String

            }

            type AuthMechanicData{
                mechanicId : ID!
                token: String!
                tokenExpiration : Int!
                fullName: String!
                accountType: String
                

            }

            input BreakDownInput{
                time_of_accident: String!
                 driver_comment: String
                 type_of_breakdown: String!
                 location_lon: [Float]
                 location_lat: [Float]
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
                company_img: String
                company_relative_location: String
                company_absolute_location_lon: [Float]
                company_absolute_location_lat: [Float]

            }

            type RootQuery{
                    breakdowns:[BreakDown!]!
                    loginDriver(email: String!, password: String!): AuthDriverData!
                    loginMechanic(email: String!, password: String!): AuthMechanicData!
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
