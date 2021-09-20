import React from 'react'
import './Order.css'
import {Button} from '@material-ui/core'

function Order({data}) {
    return (
        <div className="order">
            <img className="order__img" src={data.imgurl} />
            <div className="order__text">
                <h2 className="order__h2">{data.name}</h2>
                <h3 className="order__h3">Rs.{data.price}</h3>
                <h3 className="order__h3">Quantity : {data.quantity}</h3>
                {/* <h3 className="order__h3">{data.time}</h3>
                <h3 className="order__h3">{data.status}</h3> */}
                <Button variant="contained" size="small" className="order__return">Return</Button>
            </div>
        </div>
    )
}

export default Order
