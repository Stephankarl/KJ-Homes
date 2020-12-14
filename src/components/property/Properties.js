import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Properties extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             properties: [],
             loaded: true,
             error: null
        }
    }

    propertiesBaseURL = 'http://localhost:3000'

    getData = () => { 
        this.setState({ loaded: false })
        let URI = `${this.propertiesBaseURL}/property`
        let headers = new Headers()
        headers.append('Authorization', 'Bearer qwerty')

        let req = new Request(URI, {
            headers,
            method: 'GET'
        })
        fetch(req)
        .then(res => res.json())
        .then(this.showData)
        .catch(this.showError)
    }

    showData = (data) => {
        this.setState({
            properties: data
        })
        this.setState({ loaded: true })
    }

    showError = (err) => {
        this.setState({ loaded: true })
        this.setState({ error: err.message })
    }

    componentDidMount() {
        this.getData()
    }
    
    render() {
        const { properties, loaded, error } = this.state
        return (
            <div>
                { !loaded && (
                    <div>LOADING...</div>
                )}
                { error && (
                    <div>{ error }</div>
                )}
                <ul>
                    {properties.map((property) => (
                        <Link to={ `/property/${property._id}` } key={ property._id }>
                            <li>{ property.address.street } { property.address.city }</li>
                        </Link>
                    ))}
                </ul>
            </div>
        )
    }
}
