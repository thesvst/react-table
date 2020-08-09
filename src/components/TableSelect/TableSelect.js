import React from 'react'
import './_TableSelect.scss'

const TableSelect = ({handler}) => {
    return (
        <select className="table_amountbox" onChange={(e) => handler(e.target.value)}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="70">75</option>
            <option value="100">100</option>
        </select>
    )
}
export default TableSelect