import React from 'react';
import TableRow from "../TableRow/TableRow";

const TableRows = ({data}) => {
    return (
        <div className='table'>
            {data.map(company => <TableRow key={company.id} data={company}/>)}
        </div>
    )
}
export default TableRows