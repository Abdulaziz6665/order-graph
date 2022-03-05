import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import { ORDERS, SUBCR_ORDER } from "../Send/query"
import { DELETE_ORDER } from "./query"

function Orders() {

  const {data: orders} = useQuery(ORDERS)

  const [DeleteOrder] = useMutation(DELETE_ORDER)

  const [order, setOrder] = useState([])

  useEffect(() => {
    if (orders) {
      setOrder(orders?.orders)
    }
  }, [orders])

  useSubscription(SUBCR_ORDER, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
       cache.modify({
          fields: {
            orders: () => { }
          }
       })
    },
 })

  function deleteOrder(e) {
    DeleteOrder({variables: {
      time: e.target.value
    }})
  }

  return (
    <>
      <div>
        <div className='to-home'>
          <p>All orders</p>
            {order.length && order.map((e, idx) => (
              <div key={idx}>
                <span>{e}</span>
                <button onClick={deleteOrder} value={e}>del</button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export {
  Orders
}