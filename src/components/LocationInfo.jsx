import React from 'react'
import "./styles/locationInfo.css"

const LocationInfo = ({location}) => {

  return (
    <div className='container'>
    <article className='location'>
        <h2 className='location__name'>{location?.name}</h2>
        <ul className='location__list'>
            <li className='location__list--li'><span>Type</span><p>{location?.type}</p></li>
            <li className='location__list--li'><span>Dimension</span><p>{location?.type}</p></li>
            <li className='location__list--li'><span>Population</span><p>{location?.residents.length}</p></li>
        </ul>
    </article>
    </div>
  )
}

export default LocationInfo