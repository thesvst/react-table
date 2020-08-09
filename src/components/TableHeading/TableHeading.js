import React from 'react';
import {AVERAGE_INCOME, CITY, ID, LAST_MONTH_INCOME, NAME, TOTAL_INCOME, ASC} from "../../constants/constants";
import './_TableHeading.scss'

const TableRowItem = ({type, fieldName, handler, sort}) => {
    const isActive = type === sort
    return(
        <div className={
            'table_row_item '
            + (isActive ? 'active ' : '')
            + (sort === ASC ? 'asc ' : 'desc ')
        } data-type={type} onClick={(e) => handler(e.target.dataset.type)}>{fieldName}</div>
    )
}

const TableHeading = ({handler, data}) => {
    const { sortBy } = data
    const onClickHandler = (type) => handler(type)
    return(
        <div className="table table_heading">
            <div className="table_row">
                <TableRowItem sort={sortBy} type={ID} fieldName="ID" handler={onClickHandler}/>
                <TableRowItem sort={sortBy} type={NAME} fieldName="Name" handler={onClickHandler}/>
                <TableRowItem sort={sortBy} type={CITY} fieldName="City" handler={onClickHandler}/>
                <TableRowItem sort={sortBy} type={TOTAL_INCOME} fieldName="Total Income" handler={onClickHandler}/>
                <TableRowItem sort={sortBy} type={AVERAGE_INCOME} fieldName="Average Income" handler={onClickHandler}/>
                <TableRowItem sort={sortBy} type={LAST_MONTH_INCOME} fieldName="Last month income" handler={onClickHandler}/>
            </div>
        </div>
    )
}
export default TableHeading