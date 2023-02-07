import React from 'react'
import "./styles/pagination.css"

const Pagination = ({itemsPerPage,
    currentPage,
    setCurrentPage,
    totalItems}) => {
    
  const pageNumbers = [];

 for (let i = 1; i <= Math.ceil(totalItems/itemsPerPage); i++) {
   pageNumbers.push(i);
 }

 const handlePrevius = () => {
    setCurrentPage(currentPage - 1);
 }

 const handleNext = () => {
    setCurrentPage(currentPage + 1);
 }

 const handlePage = n => {
    setCurrentPage(n);
 }

  return (
    <div className='pagination'>
        <button style={{display: `${ pageNumbers.length <= 1 ? "none" : "block" }`}} onClick={handlePrevius} className={`pagination__previus ${ currentPage === 1 ? "disabled" : ""}`}>&#60;</button>
        <button style={{display: `${ pageNumbers.length <= 1 ? "none" : "block" }`}} onClick={handleNext}  className={`pagination__next ${ currentPage >= pageNumbers.length ? "disabled" : ""}`}>&#62;</button>
        <ul className='pagination__list'>
            {pageNumbers.map(nroPage => (
                <li onClick={()=>handlePage(nroPage)} key={nroPage} className={`pagination__item ${nroPage === currentPage ? "pagination__item--selected" : ""}`}>
                <button className='pagination__link'>
                    {nroPage}
                </button>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Pagination