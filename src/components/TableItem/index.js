// Get specifed parts of object
const getIncomeValues = (company) => company.incomes.map((income) => income.value)
const getIncomeDates = (company) => company.incomes.map(income => income.date)

// Calculate desired values

export const getTotalIncome = (company) => {
    const incomes = getIncomeValues(company)
    return incomes.reduce((total, num) => parseInt(total) + parseInt(num))
}
export const getAverageIncome = (company) => {
    const incomes = getIncomeValues(company)
    return incomes.reduce((total, num) => Math.floor(parseInt(total) + parseInt(num) / incomes.length))
}
export const getLastMonthIncome = (company) => {
    // Get and sort dates
    const dates = getIncomeDates(company)
    const sortedDates = dates.sort((a,b) => new Date(b.date) - new Date(a.date))
    // Find latest date
    const lastDate = sortedDates[dates.length - 1]
    // Find income object with latest date and get value of it)
    const lastMonthIncome = company.incomes.filter((x) => x.date === lastDate)
    return Math.floor(lastMonthIncome[0].value)
}