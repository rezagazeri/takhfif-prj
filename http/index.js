/*global config*/
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const typeDefs = require('./../api/typeDefs');
const resolvers = require('./../api/resolvers');

const app = express();

module.exports = class Application {
    constructor() {
        this.setServer();
        this.configApolloServer();
        this.configDatabase();
        this.configApp();
    }

    //setting server
    setServer() {

        ApolloServer.applymi
        app.listen(config.port, () => {
            console.log(`server connect successfully!`);
        });
    }
    configApolloServer() {
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            formatError: err => (
                console.log(err), { message: err.message, status: err.extensions.exception.status })
        });
        apolloServer.applyMiddleware({ app, path: '/graphql' })
    }
    async configDatabase() {
        try {
            await mongoose.connect(config.DB.url, config.DB.options);
            console.log('database conected success...');
        } catch (err) {
            console.log(err.message);
        }
    }

    configApp() {
        app.use(express.static(path.join(__dirname, 'public'))); //for serve file in public folder
        app.use(
            express.json({
                limit: '10kb',
            })
        );
    }
};