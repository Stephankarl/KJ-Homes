import React from 'react'

export default function MonthlySummary() {
    return (
        <div>
            <h3 style={styles.heading}>Monthly Summary</h3>
            <div style={styles.summaryContainer}>
                <div style={styles.debitContainer}>
                    <ul style={styles.list}>
                        <li>Rental Income:</li>
                    </ul>
                </div>
                <div style={styles.creditContainer}>
                    <ul style={styles.list}>
                        <li>Morgage:</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const styles = {
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
        flex: 1
    },
    creditContainer: {
        flex: 1
    }
}