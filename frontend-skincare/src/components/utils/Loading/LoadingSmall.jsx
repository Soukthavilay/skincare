import React from 'react'
import '../scss/utilsCss/spinner.scss'

const LoadingSmall = () => {
  return (
    <>
        <div className="spinner-small">
            <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
            <div>Loading...</div>
        </div>
    </>
  )
}

export default LoadingSmall