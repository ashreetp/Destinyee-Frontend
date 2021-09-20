import React from 'react'
import './Upi.css'
import {TextField,Button} from '@material-ui/core';

function Upi() {
    return (
        <div className="upi">
            <TextField className="upi__num" label="Enter UPI ID" variant="outlined" size="small" />
            <h3>UPI ID is in the format of mobilenumber@bank or username@bank</h3>
            <Button variant="contained" className="upi__btn">Verify</Button>
        </div>
    )
}

export default Upi
