import React from 'react'
import moment from 'moment'

export default function PropertyInfo(props) {
    const { property, currencyFormatter } = props;
    return (
        <div style={styles.propertyInfo}>
            <div style={styles.image}>
                <img src="" alt="Property"/>
            </div>
            <div style={styles.infoContainer}>
                <ul style={styles.listStyle}>
                    <li style={styles.listItem}>Type: <div style={styles.listDiv}>{property.type}</div></li>
                    <li style={styles.listItem}>Number of Units: <div>{ property.units }</div></li>
                    <li style={styles.listItem}>Managed by: <div>{property.propertyManager.company}</div></li>
                    <li style={styles.listItem}>Purchase Date: <div>{ moment(property.purchaseDate).format('DD MMM YYYY') }</div></li>
                    <li style={styles.listItem}>Property Value: <div>{ currencyFormatter(property.propertyValue.value) }</div></li>
                </ul>
            </div>
        </div>
    )
}

const styles = {
    propertyInfo: {
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid black'
    },
    image: {
        flex: 0.5
    },
    infoContainer: {
        flex:1
    },
    listStyle: {
        listStyle: 'none'
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        marginRight: '20px'
    }
}
