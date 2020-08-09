import React, { Component } from 'react';
import './App.scss';
import TableContent from "./components/TableContent/TableContent";
const App = () => {
    return(
        <div className='app_wrapper'>
            <h1>Check out best companies!</h1>
            <TableContent />
        </div>
    )
}
export default App;
