import {Link} from 'react-router-dom'

function Home() {

  return (
    <>
      <div className="container">
        <div>
          <button>
            <Link to={'/send'}>Send Order</Link>
          </button>
          <button>
            <Link to={'/view'}>View Order</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export {
  Home
}