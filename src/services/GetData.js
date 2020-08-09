import { COMPANIES_URL, COMPANIES_DETAILS_URL } from "../constants/constants";
import { getLastMonthIncome, getAverageIncome, getTotalIncome } from "../helpers/getCalculatedIncomes";

// Get simple data about companies and set app initial state
export async function getCompaniesData() {
    // const { companiesPerPage, currentPage } = this.state.settings
    const companiesData = await fetch(COMPANIES_URL).then(res => res.json());
    // Sort companies by id
    companiesData.sort(function(a, b) {
        return a.id - b.id  ||  a.name.localeCompare(b.name);
    });
    return companiesData
}

// Get detailed data for companies that are currently displayed
export async function getIncomesData(data) {
    const updatedCompanies = data.map(async company => {
        const incomesData = fetch(`${COMPANIES_DETAILS_URL}/${company.id}`)
            .then(res => res.json())
            .then(res => {
                // Copy displayedCompanies data
                const companiesData = data;
                const currentCompanyId = res.id;
                // Find company of current id and set key with detailed data to it
                const currentCompanyObject = companiesData.filter(x => x.id === currentCompanyId)
                // To the found object add fetched incomes
                currentCompanyObject[0].incomes = res.incomes
                // Get needed values and asign them
                currentCompanyObject[0].calculatedIncomes = {
                    total_income: getTotalIncome(company),
                    average_income: getAverageIncome(company),
                    last_month_income: getLastMonthIncome(company)
                }
                return currentCompanyObject[0]
            })
        return incomesData
    })
    return await Promise.all(updatedCompanies)
}

export async function getFullCompaniesData(){
    let companies = await getCompaniesData() // Get simple list of companies
    return await getIncomesData(companies) // return list of companies with incomes included
}