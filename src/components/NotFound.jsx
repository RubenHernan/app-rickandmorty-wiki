import React from 'react'
import "./styles/noresult.css"

const NotFound = () => {
  return (
    <div className='noresult'>
        <div className='noresult__img'>
            <img src='./NotFound.png'/>
        </div>
        <h2 className='noresult__title'>Not Found</h2>
    </div>
  )
}

export default NotFound