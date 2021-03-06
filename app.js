const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const isAuth = require('./middleware/is-auth');


let port = process.env.PORT || 4000;


const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    
});




app.use('/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,

    })
);
// mongodb+srv://Sandra:<password>@cluster0.81el4.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://${process.env.MONGO_USER}:${process.env.MONG0_PASSWORD}@cluster0.81el4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://Sandra:L5ZnZ4LfjAvzHWSV@cluster0.81el4.mongodb.net/mechanic-react-dev?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(port, () => {
            console.log(`Exemple app is listening on port http://localhost:${port}`);
        });
    })
    .catch((error) => { console.log(error); })




