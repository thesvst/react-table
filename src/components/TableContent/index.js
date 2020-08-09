import {ASC, DESC} from "../../constants/constants";

export const filterContent = (searchValue, currentPage, companies, companiesPerPage) => {
    const beginIndex = (currentPage - 1) * companiesPerPage
    const endIndex = beginIndex + companiesPerPage
    let newDisplayedContent = {};
    if(searchValue.length > 0){
        newDisplayedContent.list = companies.filter(obj => Object.keys(obj).some(key => {
            if(key === 'id' || key === 'name'|| key === 'city') {
                return obj[key].toString().toLowerCase().includes(searchValue.toLowerCase())
            }
            // if(key === 'calculatedIncomes'){
            //     obj.calculatedIncomes.some(key => {
            //         return obj[key].toString().includes(searchValue)
            //     });
            // }
        }));

        newDisplayedContent.amount = newDisplayedContent.list.length
        newDisplayedContent.list = newDisplayedContent.list.slice(beginIndex, endIndex)
    }else{
        newDisplayedContent.list = companies.slice(beginIndex, endIndex)
        newDisplayedContent.amount = companies.length
    }
    return newDisplayedContent
}
export const sortByNumber = (companies, sortBy, sortType, JSON_TYPE, type) => {
    companies.sort(function(a, b) {
        if(sortBy !== type || sortType === DESC) {
            return a[JSON_TYPE] - b[JSON_TYPE]
        }
        if(sortBy === type && sortType === ASC) {
            return b[JSON_TYPE] - a[JSON_TYPE]
        }
    })
}
export const sortByString = (companies, sortBy, sortType, JSON_TYPE, type) => {
    if(sortBy !== type || sortType === DESC) companies.sort((a,b) => (a[JSON_TYPE] > b[JSON_TYPE]) ? 1 : ((b[JSON_TYPE] > a[JSON_TYPE]) ? -1 : 0));
    if(sortBy !== type || sortType === ASC) companies.sort((a,b) => (a[JSON_TYPE] > b[JSON_TYPE]) ? 1 : ((b[JSON_TYPE] > a[JSON_TYPE]) ? -1 : 0)).reverse();
}
export const sortByIncomes = (companies, sortBy, sortType, JSON_TYPE, type) => {
    companies.sort(function(a, b) {
        if(sortBy !== type || sortType === DESC) return a.calculatedIncomes[JSON_TYPE] - b.calculatedIncomes[JSON_TYPE]
        if(sortBy === type && sortType === ASC) return b.calculatedIncomes[JSON_TYPE] - a.calculatedIncomes[JSON_TYPE]
    });
}