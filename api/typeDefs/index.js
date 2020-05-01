const { gql } = require('apollo-server-express');

const usertypeDefs = require('./user');

const typeDefs = gql `
type Query{
    _:String
}
type Mutation{
    _:String
}
`;

module.exports = [
    typeDefs,
    usertypeDefs
];