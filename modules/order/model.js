const { fetch, fetchAll } = require('../../pg/pg')

const WAITING = `
  SELECT waiting_time FROM waiting;
`
const ORDERS = `
  SELECT order_time FROM orders
`

const PUSH_WAITING = `
  INSERT INTO waiting(
    waiting_time
  ) VALUES($1) returning waiting_time
`

const NEW_ORDER = `
  INSERT INTO orders(
    order_time
  ) VALUES ($1) returning order_time
`

const DELETE_WAITING = `
  DELETE FROM waiting WHERE waiting_time = $1 returning waiting_time
`

const DELETE_ORDER = `
  DELETE FROM orders WHERE order_time = $1 returning order_time
`


const waiting = () => fetchAll(WAITING)
const orders = () => fetchAll(ORDERS)

const createWait = (time) => fetch(PUSH_WAITING, time)
const createOrder = (order) => fetch(NEW_ORDER, order)

const deleteWait = (time) => fetch(DELETE_WAITING, time)
const deleteOrder = (time) => fetch(DELETE_ORDER, time)

module.exports = {
  waiting,
  orders,
  createWait,
  createOrder,
  deleteWait,
  deleteOrder
}