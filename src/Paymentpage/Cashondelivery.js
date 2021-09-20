import React from 'react'
import './Cashondelivery.css'
import {TextField,Button} from '@material-ui/core';

function Cashondelivery() {
    return (
        <div className="cod">
            <h3>Use online payment for safety and to avail attractive cashback offers.</h3>
            <h2>Total Payable Amount = Rs.399</h2>
            <Button variant="contained" className="cod__btn">PAY WITH CASH</Button>
        </div>
    )
}

export default Cashondelivery
