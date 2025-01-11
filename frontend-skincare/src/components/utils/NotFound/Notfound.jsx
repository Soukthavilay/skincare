import React from 'react'
import { GlobalState } from '../../../GlobalState'
import { useContext } from 'react'
import '../scss/utilsCss/notfound.scss'
import { Link } from 'react-router-dom'

const Notfound = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  return (
    <>
      <div className='notfound'>
      <div className="lock"></div>
      <div className="message">
        <h1>Access to this page is restricted</h1>
        {isLogged ?
          <p>Please check with the site admin if you believe this is a mistake.</p> :
          <>
            <p>Please Login to site .</p>
            <Link to="/sign-in"><button className='button btn btn--animated btn--primary--blue btn--border--blue'>Go to Login</button></Link>
          </>
        }
      </div>
      </div>
    </>
  )
}

export default Notfound