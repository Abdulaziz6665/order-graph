import { gql } from '@apollo/client'

const CREATE_ORDER = gql`
mutation($order: String) {
  createOrder(order: $order)
}
`

const DELETE_WAITING = gql`
mutation($time: String) {
  deleteWaiting(time: $time)
}
`

const DELETE_ORDER = gql`
mutation($time: String) {
  deleteOrder(time: $time)
}
`

export {
  CREATE_ORDER,
  DELETE_ORDER,
  DELETE_WAITING
}