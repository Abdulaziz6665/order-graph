import { gql } from '@apollo/client'

const WAITING_ORDERS = gql`
{
  waiting
  orders
}
`
const WAITING = gql`
{
  waiting
}
`

const ORDERS = gql`
{
  orders
}
`

const CREATE_WAIT = gql`
mutation($time: String) {
  createWaiting(time: $time)
}
`

const SUBCR_WAIT = gql`
subscription {
  waiting
}
`
const SUBCR_ORDER = gql`
subscription {
  orders
}
`

export {
  WAITING,
  ORDERS,
  WAITING_ORDERS,
  CREATE_WAIT,
  SUBCR_WAIT,
  SUBCR_ORDER
}