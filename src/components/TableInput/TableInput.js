import React from "react";
import './_TableInput.scss'

const TableInput = ({handler}) => <input type="text" className='table_searchbox' placeholder='Search...' onChange={e => handler(e.target.value)}/>
export default TableInput