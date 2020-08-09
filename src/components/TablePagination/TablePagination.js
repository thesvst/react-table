import React, { useState } from 'react'
import './_TablePagination.scss'
const TablePagination = ({data, handler}) => {
    const { currentPage, filteredCompaniesAmount, companiesPerPage } = data
    const pagesAmount = filteredCompaniesAmount / companiesPerPage

    const paginationButtons = [];
    const onClickHandler = (e) => {
        const indexOfNewPage = Number(e.target.dataset.page)
        handler(indexOfNewPage)
    }

    const renderPagination = () => {
        let i = 0
        do{
            i++
            paginationButtons.push(
                <li
                    key={i}
                    data-page={i}
                    onClick={(e) => onClickHandler(e)}
                    className={(i === currentPage? 'active ' : '') + 'pagination_item'}>
                    {i}
                </li>)
        }while(i <= pagesAmount - 1)
        return <ul className='pagination'>
            {paginationButtons}
        </ul>
    }

    return (
        renderPagination()
    )
}
export default TablePagination