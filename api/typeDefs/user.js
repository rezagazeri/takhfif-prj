const { gql } = require('apollo-server-express');

module.exports = gql `
extend type Query{
    getuser(id:ID): User!
    getAlluser:[User!]!
}

extend type Mutation{
    signup(input:signupInput):User
    login(input:loginInput):Token
}
type User {
    id:ID!
    username: String!
    email: String!
    password: String!
    confirmpassword:String!
 }
 type Token{
     token:String!
 }
 input signupInput{
    username: String!
    email: String!
    password: String!
    confirmpassword:String!
 }
 input loginInput{
    username: String!
    password: String!
 }
`;