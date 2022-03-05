const { PubSub } = require('graphql-subscriptions');
const model = require('./model.js')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    waiting: async () => {
      try {
        const res = await model.waiting()
        let arr = []
        if (res.length) {
          arr = res.map(e => e.waiting_time)
        }
        return arr
      } catch (error) {
        console.log(error)
      }
    },
    orders: async () => {
      try {
        const res = await model.orders()
        let arr = []
        if (res.length) {
          arr = res.map(e => e.order_time)
        }
        return arr
      } catch (error) {
        console.log(error)
      }
    },
  },
  Mutation: {
    createWaiting: async (_, { time }) => {
      try {
        const added = await model.createWait(time)

        pubsub.publish('waiting', added.waiting_time)
        return 'created'
      } catch (error) {
        console.log(error)
      }
    },
    createOrder: async (_, { order }) => {
      try {
        const addedOrder = await model.createOrder(order)
        const deletedWait = await model.deleteWait(order)

        pubsub.publish('waiting', deletedWait.waiting_time)
        pubsub.publish('orders', addedOrder.order_time)
        return 'created'
      } catch (error) {
        console.log(error)
      }
    },
    deleteOrder: async (_, { time }) => {
      try {
        const deletedOrder = await model.deleteOrder(time)

        pubsub.publish('orders', deletedOrder.order_time)
      } catch (error) {
        console.log(error)
      }
    },
    deleteWaiting: async (_, { time }) => {
      try {
        const deletedWait = await model.deleteWait(time)

        pubsub.publish('waiting', deletedWait.waiting_time)
      } catch (error) {
        console.log(error)
      }
    }
  },
  Subscription: {
    waiting: {
      resolve: (payload) => payload,
      subscribe: () => pubsub.asyncIterator(['waiting'])
    },
    orders: {
      resolve: (payload) => payload,
      subscribe: () => pubsub.asyncIterator(['orders'])
    },
  }
};

module.exports = {
  resolvers
}