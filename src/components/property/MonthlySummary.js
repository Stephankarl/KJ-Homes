import React from 'react'

export default function MonthlySummary(props) {

    const { property, currencyFormatter } = props
    return (
        <div style={styles.container}>
            <h3 style={styles.heading}>Monthly Estimation</h3>
            <div style={styles.summaryContainer}>
                <div style={styles.debitContainer}>
                    <ul style={styles.list}>
                        {property.unitNumber.map(unit => (
                            <li key={unit._id} style={styles.listItem}>Unit {unit.number}: <div>{unit.rented ? currencyFormatter(unit.rentalIncome) : 0}</div></li>
                        ))}
                    </ul>
                </div>
                <div style={styles.creditContainer}>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Morgage: <div>{currencyFormatter(property.morgage)}</div></li>
                        <li style={styles.listItem}>Insurance: <div>{currencyFormatter(property.insurance.expense)}</div></li>
                        <li style={styles.listItem}>Property Manager: <div>{currencyFormatter(property.propertyManager.expense)}</div></li>
                        <li style={styles.listItem}>Average Expenses: <div>{currencyFormatter(property.averageExpense)}</div></li>
                    </ul>
                </div>
            </div>
            <div style={styles.totalsContainer}>
                <div style={styles.debitTotal}>
                    <ul>
                        <li style={styles.listItem}>Total Rental Income: <div style={styles.totals}>{currencyFormatter(property.totalRentalIncome)}</div></li>
                        <li style={styles.listItem}>CASHFLOW: <div style={styles.totals}>{currencyFormatter(property.cashflow)}</div></li>
                    </ul>
                </div>
                <div style={styles.creditTotal}>
                    <ul>
                        <li style={styles.listItem}>Total Estimated Expenses: <div style={styles.totals}>{currencyFormatter(property.estimatedMonthlyExpense)}</div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        borderBottom: '1px solid black'
    },
    heading: {
        textAlign: 'center'
    },
    summaryContainer: {
        display: 'flex'
    },
    list: {
        listStyle: 'none'
    },
    debitContainer: {
        flex: 1,
        borderRight: '1px solid black'
    },
    creditContainer: {
        flex: 1
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        marginRight: '10px'
    },
    totalsContainer: {
        display: 'flex'
    },
    debitTotal: {
        flex: 1,
        borderRight: '1px solid black'
    },
    creditTotal: {
        flex: 1
    },
    totals: {
        fontWeight: 'bold',
        borderTop: '1px solid black'
    }
}