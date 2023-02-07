
import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo';
import NotFound from './components/NotFound';
import Pagination from './components/Pagination';
import ResidentInfo from './components/ResidentInfo';
import { getRandomLocation } from './utils/getRandomLocation.js'; 

function App() {
  const [location, setLocation] = useState();
  const [numberLocation, setNumberLocation] = useState(getRandomLocation());
  const [hasError, setHasError] = useState(false);
  const [listLocation, setListLocation] = useState();
  const [isSearch,setIsSearch] = useState(false);

  //estados que me sirven para la paginacion
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalItems, setTotalItems] = useState();

  //const para poder hacer el slice al arreglo de items
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  useEffect(()=>{
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`;
    axios.get(url)
      .then(res=>{
        setHasError(false);
        setLocation(res.data);
        setTotalItems(res.data.residents.length);
      console.log(res.data)})
      .catch(err=>{
        setTotalItems(0);
        setHasError(true);
        console.log(err)})
  },[numberLocation])

  const handleSubmit = e =>{
    e.preventDefault();
    setNumberLocation(e.target.inputLocation.value.trim());
    e.target.inputLocation.value = e.target.inputLocation.value.trim();
  }

  const handleChange = e =>{
    if(e.target.value.trim() !== ""){
      setIsSearch(true);
      const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
      axios.get(url)
      .then(res => setListLocation(res.data.results))
      .catch(err => {
        setIsSearch(false);
        console.log(err)})
    }else{
      setIsSearch(false);
    }

  }

  const handleBlur = e =>{
    setIsSearch(false)
  }

  return (
    <div className="App" onClick={handleBlur}>
      <div className='header' style={{backgroundImage: "url(./banner.jpg)"}}>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <h2 className='header__title'>Rick and Morty Wiki</h2>
        <div className='form__search'>
        <input className='form__input' placeholder='Search location...' onChange={handleChange} name="inputLocation" type="text" />
        {/* <button className='form__btn'>Search</button> */}
        </div>
        <div className='references' style={{display: `${isSearch ? "block" : "none"}`}}>
        <div className='form__list'>
          {
            listLocation?.map(location => (
              <li className='form__list--li' onClick={()=>{
                setIsSearch(false);
                setNumberLocation(location.id)}} 
                key={location.id}>{location.name}</li>
            ))
            
          }
        </div>
        </div>
      </form>
      {
      hasError ? 
          <NotFound />
      :
      <>
      <LocationInfo location={location}/>
      <div className='cards'>
        {
          location?.residents.map(url =>(
            <ResidentInfo key={url} url={url}/>
          )).slice(firstIndex,lastIndex)
        }
      </div>
      </>
}
      <Pagination 
      itemsPerPage={itemsPerPage} 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalItems={totalItems}/>
    </div>
  )
}

export default App
