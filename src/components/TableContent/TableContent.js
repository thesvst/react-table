import React, {Component} from 'react';
import TableHeading from "../TableHeading/TableHeading";
import TablePagination from "../TablePagination/TablePagination";
import {getFullCompaniesData} from "../../services/GetData";
import TableRows from "../TableRows/TableRows";
import {filterContent, sortByIncomes, sortByNumber, sortByString} from './index'
import './_TableContent.scss'
import {
    ASC,
    AVERAGE_INCOME,
    CITY,
    DESC,
    ID,
    LAST_MONTH_INCOME,
    NAME,
    TOTAL_INCOME,
} from "../../constants/constants";
import TableSelect from "../TableSelect/TableSelect";
import TableInput from "../TableInput/TableInput";
import Loading from "../Loading/Loading";

class TableContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            currentPage: 1,
            companies: [],
            companiesPerPage: 25,
            displayedContent: [],
            filteredCompaniesAmount: 0,
            sortBy: ID,
            sortType: ASC
        }
    }

    onChangeInput = val => this.setState({searchValue: val}, () => this.setDisplayedContent())
    onChangeSelect = val => this.setState({companiesPerPage: parseInt(val), currentPage: 1}, () => this.setDisplayedContent())
    onClickPagination = num => this.setState({currentPage: num}, () => this.setDisplayedContent())
    onClickTableHeadingSortItems = type => {
        const { sortBy, sortType, companies } = this.state
        const JSON_TYPE = type.toLowerCase()
        if(type === ID) sortByNumber(companies, sortBy, sortType, JSON_TYPE, type)
        if(type === NAME || type === CITY) sortByString(companies, sortBy, sortType, JSON_TYPE, type)
        if(type == TOTAL_INCOME || type === AVERAGE_INCOME || type === LAST_MONTH_INCOME) sortByIncomes(companies, sortBy, sortType, JSON_TYPE, type)
        this.setState({sortType: sortType === ASC ? DESC : ASC, sortBy: type}, () => this.setDisplayedContent())
    }

    componentDidMount(){
        getFullCompaniesData()
            .then(res => this.setState({companies: res, displayedContent: res}))
            .then(() => this.setDisplayedContent())
    }
    setDisplayedContent = () => {
        const { searchValue, currentPage, companies, companiesPerPage } = this.state
        const newDisplayedContent = filterContent(searchValue, currentPage, companies, companiesPerPage)
        this.setState({displayedContent: newDisplayedContent.list, filteredCompaniesAmount: newDisplayedContent.amount})
    }
    render() {
        const { onClickPagination, onChangeSelect, onClickTableHeadingSortItems, onChangeInput } = this
        const { currentPage, displayedContent, filteredCompaniesAmount, companiesPerPage, sortBy, sortType } = this.state
        return(
            <React.Fragment>
                <div className='table_wrapper'>
                    <TableHeading data={{sortBy, sortType}} handler={onClickTableHeadingSortItems}/>
                    <TableInput handler={onChangeInput}/>
                    <TableSelect handler={onChangeSelect}/>
                    {this.state.companies.length === 0 ? <Loading/> : <TableRows data={displayedContent}/>}
                </div>
                <TablePagination data={{currentPage, filteredCompaniesAmount, companiesPerPage}} handler={onClickPagination}/>
            </React.Fragment>
        )
    }
}
export default TableContent