import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CREATE_ORDER, DELETE_WAITING } from "../Orders/query"
import { SUBCR_WAIT, WAITING } from "../Send/query"
import { Orders } from '../Orders/Orders'

function View() {

  const {data: waits} = useQuery(WAITING)
  const [CreateOrder] = useMutation(CREATE_ORDER)
  const [DeleteWaiting] = useMutation(DELETE_WAITING)

  const [wait, setWait] = useState([])

  useEffect(() => {
    if (waits) {
      setWait(waits?.waiting)
    }
  }, [waits])

  useSubscription(SUBCR_WAIT, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
       cache.modify({
          fields: {
            waiting: () => { }
          }
       })
    },
 })

  function takeOrder(e) {
    CreateOrder({variables: {
      order: e.target.value
    }})
  }

  function deleteWaiting(e) {
    DeleteWaiting({variables: {
      time: e.target.value
    }})
  }
  
  return (
    <>
      <div>
        <div className='to-home'>
          <button>
            <Link to={'/'}>Home</Link>
          </button>
          <button>
            <Link to={'/send'}>Send Order</Link>
          </button>
        </div>
        <div className='btns'>
          {wait && wait.map((e, idx) => (
            <div key={idx}>
              <button onClick={takeOrder} value={e}>press to accept {e}</button>
              <button onClick={deleteWaiting} value={e}>delete waited</button>
            </div>
          ))}
        </div>
        <Orders />
      </div>
    </>
  )
}

export {
  View
}