import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MonthlySummary from './MonthlySummary'
import PropertyInfo from './PropertyInfo'

export default class PropertyProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            property: {},
            loaded: true,
        }
    }

    async getPropery() {
        this.setState({ loaded: false })
        const URL = `http://localhost:3000/property/${this.props.match.params.id}`
        const data = await fetch(URL)
        const individualProperty = await data.json()
        this.showData(individualProperty)
    }

    showData = (data) => {
        this.setState({
            property: data,
            loaded: true
        })
    }

    currencyFormatter = (number) => {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        let formattedNumber = formatter.format(number)
        return formattedNumber
    }

    getTotalRentalIncome = () => {
        let totalIncome = 0
        this.state.property.unitNumber.map(unit => {
            if(unit.rented) {
                totalIncome += unit.rentalIncome
            } 
            return totalIncome
        })
        const totalRentalIncome = totalIncome
        return totalRentalIncome
    }

    getAverageExpense = () => {
        let totalExpense = 0
        this.state.property.expenses.map(expense => {
            totalExpense += expense.expense
            return totalExpense
        })
        const dateDiff = Date.now() - Date.parse(this.state.property.purchaseDate)
        const monthsPropertyOwned = Math.floor(dateDiff / (24 * 3600 * 1000 * 30 ))
        const averageExpense = totalExpense/monthsPropertyOwned
        return averageExpense
    }

    getEstimatedMonthlyExpense = () => {
        const estimatedMonthlyExpense = this.state.property.morgage + this.state.property.insurance.expense + this.state.property.propertyManager.expense + this.state.property.averageExpense
        return estimatedMonthlyExpense
    }

    getCashflow = () => {
        const cashflow = this.state.property.totalRentalIncome - this.state.property.estimatedMonthlyExpense
        return cashflow
    }

    updateApi = (data) => {
        const url = `http://localhost:3000/property/${this.state.property._id}/update`
        fetch(url, {
            method: 'PATCH',
            cors: 'CORS',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(data)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component Did Update')
        const averageExpense = this.getAverageExpense()
        const totalRentalIncome = this.getTotalRentalIncome()
        const estimatedMonthlyExpense = this.getEstimatedMonthlyExpense()
        const cashflow = this.getCashflow()
        if(prevState.property.averageExpense !== averageExpense ||
            prevState.property.totalRentalIncome !== totalRentalIncome || 
            prevState.property.estimatedMonthlyExpense !== estimatedMonthlyExpense ||
            prevState.property.cashflow !== cashflow) {
            this.setState(prevState => ({
                property: {
                    ...prevState.property,
                    totalRentalIncome,
                    averageExpense,
                    estimatedMonthlyExpense,
                    cashflow
                }
            }))
        } 
        this.updateApi(this.state.property)
    }

    UNSAFE_componentWillMount() {  //This should be componentDidMount
        this.getPropery()
    }

    render() {
        if (!this.state.loaded) {
            return <div>LOADING...</div>
        }

        const { property } = this.state
        return (
            <div style={ styles.constainer }>
                <div style={ styles.headerContainer }>
                    <div>
                        <Link to='/'>
                            <button style={ styles.buttons }>HOME</button>
                        </Link>
                    </div>
                    <div style={ styles.profileHeader }>
                        <h1>{property.address.street }  {property.address.city}</h1>
                    </div>
                </div>
                <PropertyInfo property={ property } currencyFormatter={ this.currencyFormatter }/>
                <MonthlySummary property={ property } currencyFormatter={ this.currencyFormatter }/>
            </div>
        )
    }
}

const styles = {
    constainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    headerContainer: {
        borderBottom: '1px solid black'
    },
    profileHeader: {
        textAlign: 'center'
    },
    buttons: {
        margin: '20px'
    }
}