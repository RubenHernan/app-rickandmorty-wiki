import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./styles/residentInfo.css"

const ResidentInfo = ({url}) => {
  const [character, setCharacter] = useState()  
  useEffect(()=>{
    axios.get(url)
    .then(res => setCharacter(res.data))
    .catch(err=> console.log(err))
  },[])


  return (
    <div className='card'>
      <div className='card__header'>
        <img src={`${character?.image}`} alt="" />
        <div className='card__header--info'>
          <span style={{backgroundColor:`${ character?.status === "Alive" ? "var(--color-green)": character?.status === "Dead" ? "var(--color-red)": "var(--color-grey)"}` }}></span>
          <p>{character?.status}</p>
        </div>
      </div>
      <div className='card__main'>
        <h2 className='card__name'>{character?.name}</h2>
        <div className='card__info'>
          <p className='card__info--p'><span>Specie: </span>{character?.species}</p>
          <p className='card__info--p'><span>Origin: </span>{character?.origin.name}</p>
          <p className='card__info--p'><span>Episode appearances: </span>{character?.episode.length}</p>
        </div>
      </div>
    </div>
  )
}

export default ResidentInfo