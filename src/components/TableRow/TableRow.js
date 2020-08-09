import React from "react";
import TableItem from "../TableItem/TableItem";
import './_TableRow.scss'

const TableRow = ({data}) => {
    const renderRow = () => {
        const { id, name, city, calculatedIncomes } = data
        const { total_income, average_income, last_month_income } = calculatedIncomes
        return (
            <div className='table_row' key={id}>
                <TableItem data={id} />
                <TableItem data={name} />
                <TableItem data={city}/>
                <TableItem data={total_income}/>
                <TableItem data={average_income}/>
                <TableItem data={last_month_income}/>
        </div>
        )
    }
    return renderRow()
}
export default TableRow