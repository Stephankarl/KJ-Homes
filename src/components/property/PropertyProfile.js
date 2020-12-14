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

    showDate = (date) => {
        const year = date.getFullYear()
        console.log(year)
    }

    currencyFormatter = (number) => {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        let formattedNumber = formatter.format(number)
        return formattedNumber
    }

    componentWillMount() {  //This should be componentDidMount
        this.getPropery()
    }

    test = () => {
        console.log(this.state.property.address)
    }
    
    render() {
        if (!this.state.loaded) {
            return <div>LOADING...</div>
        }
        this.test()
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
                        <h1>{property.address.street} Profile</h1>
                    </div>
                </div>
                <PropertyInfo property={ property } currencyFormatter={ this.currencyFormatter }/>
                <MonthlySummary />
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