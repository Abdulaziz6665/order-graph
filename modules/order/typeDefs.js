const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    waiting: [String]
    orders: [String]
  }
  
  type Mutation {
    createWaiting(time: String): String 
    createOrder(order: String): String
    deleteOrder(time: String): String
    deleteWaiting(time: String): String
  }

  type Subscription {
    waiting: String
    orders: String
  }
`

module.exports = {
  typeDefs
}