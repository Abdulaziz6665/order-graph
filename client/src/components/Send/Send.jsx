import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { WAITING_ORDERS, CREATE_WAIT, SUBCR_WAIT, SUBCR_ORDER } from './query'

import './Send.css'


const time = [
  '20:00 - 20:30', '20:30 - 21:00', '21:00 - 21:30', '21:30 - 22:00',
  '22:00 - 22:30', '22:30 - 23:00', '23:00 - 23:30', '23:30 - 00:00'
]

function Send() {
  
  const {data: waits} = useQuery(WAITING_ORDERS)

  const [CreateWaiting] = useMutation(CREATE_WAIT)

  const [wait, setWait] = useState([])
  const [order, setOrder] = useState([])

  useEffect(() => {
    if (waits) {
      setWait(waits?.waiting)
      setOrder(waits?.orders)
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
 
  useSubscription(SUBCR_ORDER, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
       cache.modify({
          fields: {
            orders: () => { }
          }
       })
    },
 })

  function takeTime(e) {
    CreateWaiting({variables: {
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
        </div>
        <div className='btns'>
          {time && time.map((e, idx) => (
            <div key={idx}>
              {<div>
                <button onClick={takeTime} value={e} disabled={wait.includes(e) || order.includes(e)}>
                  {e}
                </button>{wait.includes(e) && <>waiting</>}
              </div>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export {
  Send
}